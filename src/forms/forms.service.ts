import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserJwt } from 'src/auth/strategies/jwt.strategy';
import { Question } from 'src/questions/question.entity';
import { In, Repository } from 'typeorm';
import { CreateFormDto } from './dto/create-form.dto';
import { PatchFormDto } from './dto/patch-form.dto';
import { PutFormDto } from './dto/put-form.dto';
import { Form } from './form.entity';

@Injectable()
export class FormsService {
  constructor(
    @InjectRepository(Form)
    private formsRepository: Repository<Form>,
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
  ) {}

  async create(createFormWithUser: CreateFormDto & { user: { id: number } }) {
    const form = this.formsRepository.create(createFormWithUser);
    const created = await this.formsRepository.save(form);
    return { id: created.id };
  }

  async findAll(skip: number, take: number) {
    const forms = await this.formsRepository
      .createQueryBuilder('form')
      .leftJoin('form.user', 'user')
      .addSelect(['user.id', 'user.name'])
      .skip(skip)
      .take(take)
      .orderBy('form.id', 'DESC')
      .getMany();

    const totalCount = await this.formsRepository.count();
    return { forms, totalCount };
  }

  async findOneByIdWithQuestions(id: number) {
    return await this.formsRepository.findOne({
      where: { id },
      relations: ['questions'],
    });
  }

  async AuthFindOrThrow(user: UserJwt, id: number) {
    const form = await this.formsRepository.findOne({
      where: { id },
      relations: ['user', 'questions'],
    });
    if (!form) throw new NotFoundException();

    if (user.id !== form.user.id && user.role !== 'admin') {
      throw new UnauthorizedException();
    }
    return form;
  }

  async updateFully(user: UserJwt, id: number, updateFormDto: PutFormDto) {
    const form = await this.AuthFindOrThrow(user, id);
    // TODO: DRY
    const currentQuestionsIds = form.questions.map((q) => q.id);
    const questionsIdsToUpdate = updateFormDto.questions.map((q) => q.id);
    const questionsIdToDelete = currentQuestionsIds.filter(
      (q) => !questionsIdsToUpdate.includes(q),
    );
    const newQuestions = updateFormDto.questions.filter(
      (q) => q.id === undefined,
    );
    const questionsToUpdate = [];
    updateFormDto.questions.forEach((q) => {
      if (currentQuestionsIds.includes(q.id)) questionsToUpdate.push(q);
    });
    updateFormDto.questions = [...newQuestions, ...questionsToUpdate];
    await this.questionRepository.delete({ id: In(questionsIdToDelete) });
    delete form.questions;

    this.formsRepository.merge(form, updateFormDto);
    await this.formsRepository.save(form);

    return { message: 'Form updated' };
  }

  async updatePartially(
    user: UserJwt,
    id: number,
    updateFormDto: PatchFormDto,
  ) {
    const form = await this.AuthFindOrThrow(user, id);

    if (updateFormDto.questions) {
      // TODO: DRY
      const currentQuestionsIds = form.questions.map((q) => q.id);
      const questionsIdsToUpdate = updateFormDto.questions.map((q) => q.id);
      const questionsIdToDelete = currentQuestionsIds.filter(
        (q) => !questionsIdsToUpdate.includes(q),
      );
      const newQuestions = updateFormDto.questions.filter(
        (q) => q.id === undefined,
      );
      const questionsToUpdate = [];
      updateFormDto.questions.forEach((q) => {
        if (currentQuestionsIds.includes(q.id)) questionsToUpdate.push(q);
      });
      updateFormDto.questions = [...newQuestions, ...questionsToUpdate];
      await this.questionRepository.delete({ id: In(questionsIdToDelete) });
      delete form.questions;
    }
    this.formsRepository.merge(form, { ...form, ...updateFormDto });
    await this.formsRepository.save(form);
    return { message: 'Form updated' };
  }

  async remove(user: UserJwt, id: number) {
    const form = await this.formsRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!form) throw new NotFoundException();

    if (user.id !== form.user.id && user.role !== 'admin') {
      throw new UnauthorizedException();
    }

    await this.formsRepository.delete({ id });
    return { message: 'Form deleted' };
  }
}

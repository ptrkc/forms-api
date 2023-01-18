import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { Answer } from './answer.entity';
import { AnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';

@Injectable()
export class AnswersService {
  constructor(
    @InjectRepository(Answer)
    private answersRepository: Repository<Answer>,
  ) {}

  async create(id: number, user: User, answers: AnswerDto[]) {
    const items = answers.map((item) =>
      this.answersRepository.create({
        description: item.description,
        question: { id: item.questionId },
        user: { id: user.id },
        form: { id },
      }),
    );
    await this.answersRepository.save(items);
    return { message: 'Answers created' };
  }

  async findAll(id: number, skip: number, take: number) {
    const answers = await this.answersRepository.find({
      skip,
      take,
      order: { id: 'desc' },
      select: {
        id: true,
        description: true,
      },
      where: {
        form: { id },
      },
    });
    const totalCount = await this.answersRepository.count({
      where: {
        form: { id },
      },
    });
    return { answers, totalCount };
  }

  async update(
    formId: number,
    answerId: number,
    user: User,
    updateAnswerDto: UpdateAnswerDto,
  ) {
    const answer = await this.answersRepository.findOne({
      where: { id: answerId },
      relations: ['form', 'user'],
    });
    if (!answer || answer.form.id !== formId) throw new NotFoundException();

    if (user.id !== answer.user.id && user.role !== 'admin') {
      throw new UnauthorizedException();
    }

    this.answersRepository.update(answerId, updateAnswerDto);
    return { message: 'Answer updated' };
  }

  async remove(answerId: number, formId: number, user: User) {
    const answer = await this.answersRepository.findOne({
      where: { id: answerId },
      relations: ['form', 'user'],
    });
    if (!answer || answer.form.id !== formId) throw new NotFoundException();

    if (user.id !== answer.user.id && user.role !== 'admin') {
      throw new UnauthorizedException();
    }

    await this.answersRepository.remove(answer);
    return { message: 'Answer deleted' };
  }
}

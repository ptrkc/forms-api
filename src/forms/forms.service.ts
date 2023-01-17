import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserJwt } from 'src/auth/strategies/jwt.strategy';
import { Repository } from 'typeorm';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import { Form } from './form.entity';

@Injectable()
export class FormsService {
  constructor(
    @InjectRepository(Form)
    private formsRepository: Repository<Form>,
  ) {}

  async create(createFormWithUser: CreateFormDto & { user: { id: number } }) {
    const form = this.formsRepository.create(createFormWithUser);
    await this.formsRepository.save(form);
    return { message: 'Form created' };
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
    const form = await this.formsRepository
      .createQueryBuilder('form')
      .leftJoinAndSelect('form.user', 'user')
      .addSelect('user.id')
      .where('form.id = :id', { id })
      .getOne();
    if (!form) throw new NotFoundException();

    if (user.id !== form.user.id && user.role !== 'admin') {
      throw new UnauthorizedException();
    }
    return form;
  }

  async updateFully(user: UserJwt, id: number, updateFormDto: UpdateFormDto) {
    const form = await this.AuthFindOrThrow(user, id);
    await this.formsRepository.update(form.id, updateFormDto);
    return { message: 'Form updated' };
  }

  async updatePartially(
    user: UserJwt,
    id: number,
    updateFormDto: UpdateFormDto,
  ) {
    const form = await this.AuthFindOrThrow(user, id);

    this.formsRepository.merge(form, { ...form, ...updateFormDto });
    await this.formsRepository.save(form);
    return { message: 'Form updated' };
  }

  async remove(user: UserJwt, id: number) {
    if (user.role !== 'admin') {
      const form = await this.formsRepository.findOne({
        where: { id },
        relations: ['user'],
      });
      if (form && form.user?.id !== user.id) {
        throw new UnauthorizedException();
      }
    }

    await this.formsRepository.delete({ id });
    return { message: 'Form deleted' };
  }
}

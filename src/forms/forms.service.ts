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
    return await this.formsRepository.find({ skip, take });
  }

  async findOneById(id: number) {
    return await this.formsRepository.findOneBy({ id });
  }

  async AuthFindOrThrow(user: UserJwt, id: number) {
    let form: Form;
    if (user.role !== 'admin') {
      form = await this.formsRepository.findOne({
        where: { id },
        relations: ['user'],
      });
      if (!form) throw new NotFoundException();

      if (form.user?.id !== user.id) {
        throw new UnauthorizedException();
      } else {
        return form;
      }
    }
    return await this.formsRepository.findOneBy({ id });
  }

  async updateFully(user: UserJwt, id: number, updateFormDto: CreateFormDto) {
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
    this.formsRepository.merge(form, updateFormDto);
    await this.formsRepository.save(user);
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

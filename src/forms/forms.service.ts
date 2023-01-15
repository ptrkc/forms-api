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

  findAll(skip: number, take: number) {
    return this.formsRepository.find({ skip, take });
  }

  findOne(id: number) {
    return `This action returns a #${id} form`;
  }

  update(id: number, updateFormDto: UpdateFormDto) {
    return `This action updates a #${id} form`;
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

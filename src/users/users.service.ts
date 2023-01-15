import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.usersRepository.create(createUserDto);
    await this.usersRepository.save(user);
    return { message: 'User created' };
  }

  async findAll(skip: number, take: number) {
    return await this.usersRepository.find({ skip, take });
  }

  async findByCpf(cpf: string) {
    return await this.usersRepository.findOneBy({ cpf });
  }

  async update(id: number, userData: CreateUserDto | UpdateUserDto) {
    const user = await this.usersRepository.findOneByOrFail({ id });
    this.usersRepository.merge(user, userData);
    await this.usersRepository.save(user);
    return { message: 'User updated' };
  }

  async remove(id: number) {
    await this.usersRepository.delete({ id });
    return { message: 'User deleted' };
  }
}

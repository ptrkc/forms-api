import { ConflictException, Injectable } from '@nestjs/common';
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
    const userExists = await this.usersRepository.findOneBy({
      cpf: createUserDto.cpf,
    });
    if (userExists) throw new ConflictException();

    const user = this.usersRepository.create(createUserDto);
    await this.usersRepository.save(user);
    return { message: 'User created' };
  }

  async findAll(skip: number, take: number) {
    const users = await this.usersRepository.find({
      skip,
      take,
      order: { id: 'desc' },
      select: {
        id: true,
        role: true,
        name: true,
        cpf: true,
      },
    });
    const totalCount = await this.usersRepository.count();
    return { users, totalCount };
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

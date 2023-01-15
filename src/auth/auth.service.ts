import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { compare } from 'bcrypt';
import { User } from 'src/users/user.entity';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(
    cpf: string,
    receivedPassword: string,
  ): Promise<null | User> {
    const user = await this.usersService.findByCpf(cpf);
    if (!user) return null;

    const match = await compare(receivedPassword, user.password);
    if (match) {
      return user;
    }
    return null;
  }
}

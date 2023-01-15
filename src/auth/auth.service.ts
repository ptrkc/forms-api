import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { compare } from 'bcrypt';
import { User } from 'src/users/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
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

  async login(user: User) {
    const payload = { cpf: user.cpf, role: user.role, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

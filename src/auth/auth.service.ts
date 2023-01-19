import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { compare } from 'bcrypt';
import { User } from 'src/users/user.entity';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Token } from 'src/tokens/token.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectRepository(Token)
    private tokensRepository: Repository<Token>,
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

  async validateToken(userId: number, token: string) {
    const foundToken = await this.tokensRepository.findOne({
      where: { jwt: token, user: { id: userId } },
    });
    if (!foundToken) {
      throw new UnauthorizedException();
    }
  }

  async saveToken(userId: number, token: string) {
    const newToken = this.tokensRepository.create({
      jwt: token,
      user: { id: userId },
    });
    await this.tokensRepository.save(newToken);
  }

  async login(user: User) {
    const payload = {
      role: user.role,
      sub: user.id,
      name: user.name,
    };
    const token = this.jwtService.sign(payload);
    await this.saveToken(user.id, token);
    return {
      access_token: token,
    };
  }
}

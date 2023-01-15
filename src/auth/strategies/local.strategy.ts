import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { User } from 'src/users/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'cpf',
      passwordField: 'password',
    });
  }

  async validate(
    cpf: string,
    password: string,
  ): Promise<User | UnauthorizedException> {
    const user = await this.authService.validateUser(cpf, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

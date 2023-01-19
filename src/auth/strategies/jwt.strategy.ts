import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';
import e from 'express';

interface Payload {
  sub: number;
  cpf: string;
  role: string;
}
export interface UserJwt {
  id: number;
  cpf: string;
  role: string;
}
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    readonly configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(req: e.Request, payload: Payload) {
    const token = req.headers['authorization'].split(' ')[1];
    await this.authService.validateToken(payload.sub, token);
    return {
      id: payload.sub,
      role: payload.role,
    };
  }
}

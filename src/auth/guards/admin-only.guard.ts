import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common';
import { UserJwt } from '../strategies/jwt.strategy';

@Injectable()
export class AdminOnlyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const user: UserJwt = context.switchToHttp().getRequest().user;
    if (user.role === 'admin') return true;

    throw new UnauthorizedException();
  }
}

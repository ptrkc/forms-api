import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common';
import { UserJwt } from '../strategies/jwt.strategy';

@Injectable()
export class OwnerGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user: UserJwt = request.user;
    const params: { id: number } = request.params;
    if (user.role === 'admin' || user.id === Number(params.id)) return true;

    throw new UnauthorizedException();
  }
}

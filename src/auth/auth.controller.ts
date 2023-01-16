import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBasicAuth,
  ApiBody,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { User } from 'src/users/user.entity';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @ApiBasicAuth()
  @ApiUnauthorizedResponse({ description: 'Wrong credentials.' })
  @ApiBody({
    type: AuthCredentialsDto,
    description: 'The credentials to login',
  })
  @Post('login')
  async login(@Request() req: { user: User }) {
    return this.authService.login(req.user);
  }
}

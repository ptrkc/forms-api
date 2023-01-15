import { ConfigService } from '@nestjs/config';
import { JwtModuleAsyncOptions } from '@nestjs/jwt';

export const jwtConfig: JwtModuleAsyncOptions = {
  useFactory: (configService: ConfigService) => {
    return {
      secret: configService.get('JWT_SECRET'),
      signOptions: { expiresIn: '1d' },
    };
  },
  inject: [ConfigService],
};

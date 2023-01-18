import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { SeedModule } from './seed/seed.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const seedFlag = configService.get('SEED_FLAG');
  if (seedFlag === 'TRUE') {
    const seedModule = app.select(SeedModule);
    await seedModule.get(SeedModule).seed();
    return app.close();
  }

  const config = new DocumentBuilder()
    .setTitle('forms-api')
    .setDescription('The forms API description')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'access-token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );
  app.enableCors();
  await app.listen(3000);
}
bootstrap();

import { Module } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { AnswersController } from './answers.controller';
import { Answer } from './answer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Form } from 'src/forms/form.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Answer, Form])],
  controllers: [AnswersController],
  providers: [AnswersService],
})
export class AnswersModule {}

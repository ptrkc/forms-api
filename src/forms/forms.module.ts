import { Module } from '@nestjs/common';
import { FormsService } from './forms.service';
import { FormsController } from './forms.controller';
import { Form } from './form.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from 'src/questions/question.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Form, Question])],
  controllers: [FormsController],
  providers: [FormsService],
})
export class FormsModule {}

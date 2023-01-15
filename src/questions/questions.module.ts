import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './question.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Question])],
  providers: [QuestionsService],
})
export class QuestionsModule {}

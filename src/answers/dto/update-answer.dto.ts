import { PartialType } from '@nestjs/mapped-types';
import { IsNumber } from 'class-validator';
import { CreateAnswerDto } from './create-answer.dto';

export class UpdateAnswerDto extends PartialType(CreateAnswerDto) {
  @IsNumber()
  id: number;
}

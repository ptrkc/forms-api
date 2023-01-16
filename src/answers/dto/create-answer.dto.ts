import { IsNumber, IsString } from 'class-validator';

export class CreateAnswerDto {
  @IsString()
  description: string;

  @IsNumber()
  questionId: string;

  @IsNumber()
  userId: string;
}

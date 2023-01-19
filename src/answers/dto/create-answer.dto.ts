import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsNumber, IsString } from 'class-validator';

export class AnswerDto {
  @IsString()
  @ApiProperty({
    example: 'Sim, eu gosto de chocolate',
  })
  description: string;

  @IsNumber()
  @ApiProperty({
    example: 4,
  })
  questionId: number;
}
export class CreateAnswerDto {
  @ArrayNotEmpty()
  @ApiProperty({
    isArray: true,
    type: AnswerDto,
    example: [
      { questionId: 2, description: 'Sim, eu gosto de chocolate' },
      { questionId: 3, description: 'Não, não gosto de refrigerante' },
    ],
  })
  answers: AnswerDto[];
}

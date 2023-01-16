import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

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

  @IsNumber()
  @ApiProperty({
    example: 2,
  })
  userId?: number;

  @IsNumber()
  @ApiProperty({
    example: 3,
  })
  formId: number;
}
export class CreateAnswerDto {
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => AnswerDto)
  @ApiProperty()
  answers: AnswerDto[];
}

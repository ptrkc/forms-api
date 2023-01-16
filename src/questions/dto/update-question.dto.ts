import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateQuestionDto } from './create-question.dto';

export class UpdateQuestionDto extends PartialType(CreateQuestionDto) {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Qual seu livro favorito?',
  })
  description: string;

  @IsOptional()
  @ApiProperty({
    example: '2',
  })
  id?: number;
}

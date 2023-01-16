import {
  ArrayNotEmpty,
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateQuestionDto } from 'src/questions/dto/create-question.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFormDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Questionário de satisfação',
  })
  name: string;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({
    example: '2022-01-01',
  })
  date: Date;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Gostariamos de saber se nossos colaboradores estão satisfeitos',
  })
  description: string;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateQuestionDto)
  @ApiProperty({
    example: [
      { description: 'Você recomendaria a empresa a alguém?' },
      { description: 'Você se sente seguro no ambiente de trabalho?' },
    ],
  })
  questions: CreateQuestionDto[];
}

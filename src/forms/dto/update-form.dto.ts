import {
  ArrayNotEmpty,
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateQuestionDto } from 'src/questions/dto/update-question.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateFormDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    example: '3',
  })
  id: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Ficha cadastral',
  })
  name: string;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({
    example: '2022-12-10',
  })
  date: Date;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Para todos que querem participar do clube do livro',
  })
  description: string;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => UpdateQuestionDto)
  @ApiProperty()
  questions: UpdateQuestionDto[];
}

import {
  ArrayNotEmpty,
  IsArray,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateQuestionDto } from 'src/questions/dto/update-question.dto';
import { ApiProperty } from '@nestjs/swagger';
import { CreateFormDto } from './create-form.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateFormDto extends PartialType(CreateFormDto) {
  @IsOptional()
  @ApiProperty()
  id: number;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => UpdateQuestionDto)
  @ApiProperty()
  questions: UpdateQuestionDto[];
}

import {
  ArrayNotEmpty,
  IsArray,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateQuestionDto } from 'src/questions/dto/update-question.dto';
import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { CreateFormDto } from './create-form.dto';

export class PatchFormDto extends PartialType(
  OmitType(CreateFormDto, ['questions']),
) {
  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => UpdateQuestionDto)
  @ApiProperty({
    example: [
      {
        id: 73,
        description: 'Essa perguta com id vai ser editada',
      },
      {
        description: 'Essa sem será criada, as deixadas de fora deletadas',
      },
    ],
  })
  questions: UpdateQuestionDto[];
}

import { OmitType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { UpdateQuestionDto } from 'src/questions/dto/update-question.dto';
import { CreateFormDto } from './create-form.dto';

export class GetFormResponse extends OmitType(CreateFormDto, ['questions']) {
  @ApiProperty({
    example: [
      {
        id: 5,
        description: 'Você recomendaria a empresa a alguém?',
      },
      {
        id: 6,
        description: 'Você se sente seguro no ambiente de trabalho?',
      },
    ],
  })
  questions: UpdateQuestionDto[];
}

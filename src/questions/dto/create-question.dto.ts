import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateQuestionDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Qual seu filme favorito?',
  })
  description: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

class AnswerResponse {
  @IsNumber()
  @ApiProperty({
    example: 2,
  })
  id: number;

  @IsString()
  @ApiProperty({
    example: 'Sim, eu gosto de chocolate',
  })
  description: string;
}

export class AnswersResponse {
  @ApiProperty()
  answers: AnswerResponse[];

  @IsNumber()
  @ApiProperty({ example: 1 })
  totalCount: number;
}

import { ApiProperty } from '@nestjs/swagger';
import { Form } from '../form.entity';

export class GetFormsResponse {
  @ApiProperty({ example: 1 })
  itemCount: number;

  @ApiProperty({
    type: Form,
    example: [
      {
        id: 2,
        date: '2023-01-16T03:00:00.000Z',
        name: 'Pesquisa pra faculdade',
        description: 'favorzin é pro meu TCC',
        user: {
          id: 1,
          name: 'João',
        },
      },
    ],
  })
  forms: Form[];
}

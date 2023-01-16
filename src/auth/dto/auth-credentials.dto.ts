import { ApiProperty } from '@nestjs/swagger';

export class AuthCredentialsDto {
  @ApiProperty({
    type: 'string',
    required: true,
    minLength: 11,
    maxLength: 11,
    pattern: '^[0-9]*$',
    description: 'The cpf of the user',
    example: '17325685425',
  })
  cpf: string;

  @ApiProperty({
    type: 'string',
    required: true,
    description: 'The password of the user',
    example: 'hunter2',
  })
  password: string;
}

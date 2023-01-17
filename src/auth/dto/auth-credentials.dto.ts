import { ApiProperty } from '@nestjs/swagger';

export class AuthCredentialsDto {
  @ApiProperty({
    type: 'string',
    example: '17325685425',
  })
  cpf: string;

  @ApiProperty({
    type: 'string',
    example: 'hunter2',
  })
  password: string;
}

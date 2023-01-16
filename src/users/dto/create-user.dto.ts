import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString, IsString, Matches } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'João Paulo',
  })
  name: string;

  @IsNumberString({}, { message: 'O CPF deve conter apenas números.' })
  @Matches(/^\d{11}$/, { message: 'O CPF deve conter 11 números' })
  @ApiProperty({
    example: '17325685425',
  })
  cpf: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'hunter2',
  })
  password: string;
}

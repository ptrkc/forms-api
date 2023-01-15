import { IsNotEmpty, IsNumberString, IsString, Matches } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNumberString({}, { message: 'O CPF deve conter apenas números.' })
  @Matches(/^\d{11}$/, { message: 'O CPF deve conter 11 números' })
  cpf: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('usuarios')
  findAll() {
    return this.usersService.findAll();
  }

  @Post('usuario')
  async create(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);
    await this.usersService.create(createUserDto);
  }

  @Get('usuario/:id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOneById(+id);
  }

  @Patch('usuario/:id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete('usuario/:id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}

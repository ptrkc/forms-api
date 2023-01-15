import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Query,
  ParseIntPipe,
  UseGuards,
  DefaultValuePipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AdminOnlyGuard } from 'src/auth/guards/admin-only.guard';
import { OwnerGuard } from 'src/auth/guards/owner.guard';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard, AdminOnlyGuard)
  @Get('usuarios')
  async findAll(
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: number,
    @Query('take', new DefaultValuePipe(10), ParseIntPipe) take: number,
  ) {
    return await this.usersService.findAll(skip, take);
  }

  @Post('usuario')
  async create(@Body() createUserDto: CreateUserDto) {
    await this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard, OwnerGuard)
  @Put('usuario/:id')
  async updateCompletely(
    @Param('id') id: string,
    @Body() updateUserDto: CreateUserDto,
  ) {
    return await this.usersService.update(+id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard, OwnerGuard)
  @Patch('usuario/:id')
  async updatePartially(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.usersService.update(+id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard, OwnerGuard)
  @Delete('usuario/:id')
  async remove(@Param('id') id: string) {
    return await this.usersService.remove(+id);
  }
}

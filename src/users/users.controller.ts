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
import {
  ApiBearerAuth,
  ApiQuery,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { User } from './user.entity';

@Controller()
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard, AdminOnlyGuard)
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Not admin user.' })
  @ApiQuery({ name: 'skip', required: false, description: 'Default is 0' })
  @ApiQuery({ name: 'take', required: false, description: 'Default is 10' })
  @ApiResponse({
    type: User,
    isArray: true,
    status: 200,
  })
  @ApiUnauthorizedResponse({ description: 'Unregistered user.' })
  @Get('usuarios')
  async findAll(
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: number,
    @Query('take', new DefaultValuePipe(10), ParseIntPipe) take: number,
  ) {
    return await this.usersService.findAll(skip, take);
  }

  @Post('usuario')
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard, OwnerGuard)
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({
    description: 'Unregistered or not owner of user :id.',
  })
  @Put('usuario/:id')
  async updateCompletely(
    @Param('id') id: string,
    @Body() updateUserDto: CreateUserDto,
  ) {
    return await this.usersService.update(+id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard, OwnerGuard)
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({
    description: 'Unregistered or not owner of user :id.',
  })
  @Patch('usuario/:id')
  async updatePartially(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.usersService.update(+id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard, OwnerGuard)
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({
    description: 'Unregistered or not owner of user :id.',
  })
  @Delete('usuario/:id')
  async remove(@Param('id') id: string) {
    return await this.usersService.remove(+id);
  }
}

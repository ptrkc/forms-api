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
  ApiConflictResponse,
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
  @ApiBearerAuth('access-token')
  @ApiUnauthorizedResponse({ description: 'Not admin user.' })
  @ApiQuery({ name: 'skip', required: false, description: 'Default is 0' })
  @ApiQuery({ name: 'take', required: false, description: 'Default is 10' })
  @ApiResponse({
    type: User,
    isArray: true,
    status: 200,
  })
  @Get('usuarios')
  async findAll(
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: number,
    @Query('take', new DefaultValuePipe(10), ParseIntPipe) take: number,
  ) {
    return await this.usersService.findAll(skip, take);
  }

  @ApiConflictResponse({ description: 'CPF already enrolled' })
  @Post('usuario')
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard, OwnerGuard)
  @ApiBearerAuth('access-token')
  @ApiResponse({
    status: 200,
    description: "{message: 'User updated'}",
  })
  @ApiUnauthorizedResponse({
    description: 'Unregistered or not owner of user :id.',
  })
  @Put('usuario/:id')
  async updateFully(
    @Param('id') id: string,
    @Body() updateUserDto: CreateUserDto, // all filed are required
  ) {
    return await this.usersService.updateFully(+id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard, OwnerGuard)
  @ApiBearerAuth('access-token')
  @ApiResponse({
    status: 200,
    description: "{message: 'User updated'}",
  })
  @ApiUnauthorizedResponse({
    description: 'Unregistered or not owner of user :id.',
  })
  @Patch('usuario/:id')
  async updatePartially(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.usersService.updatePartially(+id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard, OwnerGuard)
  @ApiBearerAuth('access-token')
  @ApiResponse({
    status: 200,
    description: "{message: 'User deleted'}",
  })
  @ApiUnauthorizedResponse({
    description: 'Unregistered or not owner of user :id.',
  })
  @Delete('usuario/:id')
  async remove(@Param('id') id: string) {
    return await this.usersService.remove(+id);
  }
}

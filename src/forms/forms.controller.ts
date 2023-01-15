import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  DefaultValuePipe,
  ParseIntPipe,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { FormsService } from './forms.service';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import { UserJwt } from 'src/auth/strategies/jwt.strategy';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller()
export class FormsController {
  constructor(private readonly formsService: FormsService) {}

  @Post('questionarios')
  @UseGuards(JwtAuthGuard)
  create(@Body() createFormDto: CreateFormDto, @Req() req: { user: UserJwt }) {
    return this.formsService.create({
      ...createFormDto,
      user: { id: req.user.id },
    });
  }

  @Get('questionarios')
  findAll(
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: number,
    @Query('take', new DefaultValuePipe(10), ParseIntPipe) take: number,
  ) {
    return this.formsService.findAll(skip, take);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.formsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFormDto: UpdateFormDto) {
    return this.formsService.update(+id, updateFormDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('questionario/:id')
  remove(@Param('id') id: string, @Req() req: { user: UserJwt }) {
    return this.formsService.remove(req.user, +id);
  }
}

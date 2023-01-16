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
  Put,
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
  async create(
    @Body() createFormDto: CreateFormDto,
    @Req() req: { user: UserJwt },
  ) {
    return await this.formsService.create({
      ...createFormDto,
      user: { id: req.user.id },
    });
  }

  @Get('questionarios')
  async findAll(
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: number,
    @Query('take', new DefaultValuePipe(10), ParseIntPipe) take: number,
  ) {
    return await this.formsService.findAll(skip, take);
  }

  @UseGuards(JwtAuthGuard)
  @Get('questionario/:id')
  async findOne(@Param('id') id: string) {
    return await this.formsService.findOneById(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('questionario/:id')
  async updateFully(
    @Param('id') id: string,
    @Body() updateFormDto: CreateFormDto,
    @Req() req: { user: UserJwt },
  ) {
    return await this.formsService.updateFully(req.user, +id, updateFormDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('questionario/:id')
  async updatePartially(
    @Param('id') id: string,
    @Body() updateFormDto: UpdateFormDto,
    @Req() req: { user: UserJwt },
  ) {
    return await this.formsService.updatePartially(
      req.user,
      +id,
      updateFormDto,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete('questionario/:id')
  async remove(@Param('id') id: string, @Req() req: { user: UserJwt }) {
    return await this.formsService.remove(req.user, +id);
  }
}

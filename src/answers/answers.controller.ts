import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  DefaultValuePipe,
  ParseIntPipe,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AdminOnlyGuard } from 'src/auth/guards/admin-only.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/users/user.entity';
import { AnswersService } from './answers.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';

@Controller()
export class AnswersController {
  constructor(private readonly answersService: AnswersService) {}

  @UseGuards(JwtAuthGuard, AdminOnlyGuard)
  @Get('questionario/:formId/respostas')
  async findAll(
    @Param('formId') id: string,
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: number,
    @Query('take', new DefaultValuePipe(10), ParseIntPipe) take: number,
  ) {
    return await this.answersService.findAll(+id, skip, take);
  }
  @UseGuards(JwtAuthGuard)
  @Post('questionario/:formId/resposta')
  create(
    @Param('formId') id: string,
    @Body() createAnswerDto: Omit<CreateAnswerDto, 'userId'>,
    @Req() req: { user: User },
  ) {
    return this.answersService.create(+id, req.user, createAnswerDto.answers);
  }
  @UseGuards(JwtAuthGuard)
  @Put('/questionario/:formId/resposta/:answerId')
  update(
    @Param('answerId') id: string,
    @Body() updateAnswerDto: UpdateAnswerDto,
  ) {
    return this.answersService.update(+id, updateAnswerDto);
  }
  @UseGuards(JwtAuthGuard)
  @Delete('/questionario/:formId/resposta/:answerId')
  remove(@Param('answerId') id: string) {
    return this.answersService.remove(+id);
  }
}

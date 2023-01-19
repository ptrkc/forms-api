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
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiQuery,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/users/user.entity';
import { AnswersService } from './answers.service';
import { AnswerDto, CreateAnswerDto } from './dto/create-answer.dto';
import { AnswersResponse } from './dto/get-answers.dto';

@ApiBearerAuth('access-token')
@ApiUnauthorizedResponse({ description: 'Unregistered user.' })
@Controller()
@ApiTags('answers')
export class AnswersController {
  constructor(private readonly answersService: AnswersService) {}

  @UseGuards(JwtAuthGuard)
  @ApiResponse({ type: AnswersResponse, isArray: true, status: 200 })
  @ApiQuery({ name: 'skip', required: false, description: 'Default is 0' })
  @ApiQuery({ name: 'take', required: false, description: 'Default is 10' })
  @Get('questionario/:formId/respostas')
  async findAll(
    @Param('formId') id: string,
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: number,
    @Query('take', new DefaultValuePipe(10), ParseIntPipe) take: number,
  ) {
    return await this.answersService.findAll(+id, skip, take);
  }
  @UseGuards(JwtAuthGuard)
  @ApiNotFoundResponse({ description: 'Form not found' })
  @ApiResponse({ description: "{ message: 'Answer created'}" })
  @Post('questionario/:formId/resposta')
  async create(
    @Param('formId') id: string,
    @Body() createAnswerDto: CreateAnswerDto,
    @Req() req: { user: User },
  ) {
    return await this.answersService.create(
      +id,
      req.user,
      createAnswerDto.answers,
    );
  }
  @UseGuards(JwtAuthGuard)
  @ApiNotFoundResponse({
    description: "Combination of formId, answerId and questionId doesn't exist",
  })
  @ApiResponse({ description: "{ message: 'Answer updated'}" })
  @ApiUnauthorizedResponse({ description: 'User does not own the answer' })
  @Put('/questionario/:formId/resposta/:answerId')
  update(
    @Param('formId') formId: string,
    @Param('answerId') answerId: string,
    @Body() updateAnswerDto: AnswerDto,
    @Req() req: { user: User },
  ) {
    return this.answersService.update(
      +formId,
      +answerId,
      req.user,
      updateAnswerDto,
    );
  }
  @ApiResponse({ status: 200, description: "{ message: 'Answer deleted' }" })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiUnauthorizedResponse({ description: 'User is not owner nor admin' })
  @UseGuards(JwtAuthGuard)
  @Delete('/questionario/:formId/resposta/:answerId')
  async remove(
    @Param('formId') formId: string,
    @Param('answerId') answerId: string,
    @Req() req: { user: User },
  ) {
    return await this.answersService.remove(+answerId, +formId, req.user);
  }
}

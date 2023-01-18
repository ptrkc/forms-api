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
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiQuery,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { GetFormsResponse } from './dto/get-forms-response.dto';
import { GetFormResponse } from './dto/get-form-response.dto';

@Controller()
@ApiTags('forms')
export class FormsController {
  constructor(private readonly formsService: FormsService) {}

  @ApiQuery({ name: 'skip', required: false, description: 'Default is 0' })
  @ApiQuery({ name: 'take', required: false, description: 'Default is 10' })
  @ApiResponse({ status: 200, type: GetFormsResponse })
  @Get('questionarios')
  async findAll(
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: number,
    @Query('take', new DefaultValuePipe(10), ParseIntPipe) take: number,
  ) {
    return await this.formsService.findAll(skip, take);
  }

  @Post('questionarios')
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({ description: '{ id: :id }' })
  @ApiUnauthorizedResponse({ description: 'Unregistered user.' })
  @ApiBearerAuth('access-token')
  async create(
    @Body() createFormDto: CreateFormDto,
    @Req() req: { user: UserJwt },
  ) {
    return await this.formsService.create({
      ...createFormDto,
      user: { id: req.user.id },
    });
  }

  @UseGuards(JwtAuthGuard)
  @ApiUnauthorizedResponse({ description: 'Unregistered user.' })
  @ApiBearerAuth('access-token')
  @ApiResponse({ type: GetFormResponse, status: 200 })
  @Get('questionario/:id')
  async findOne(@Param('id') id: string) {
    return await this.formsService.findOneByIdWithQuestions(+id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiUnauthorizedResponse({ description: 'Unregistered user.' })
  @ApiBearerAuth('access-token')
  @ApiResponse({ description: "{ message: 'Form updated' }" })
  @Put('questionario/:id')
  async updateFully(
    @Param('id') id: string,
    @Body() updateFormDto: UpdateFormDto,
    @Req() req: { user: UserJwt },
  ) {
    return await this.formsService.updateFully(req.user, +id, updateFormDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiUnauthorizedResponse({ description: 'Unregistered user.' })
  @ApiBearerAuth('access-token')
  @ApiResponse({ description: "{ message: 'Form updated' }" })
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
  @ApiUnauthorizedResponse({ description: 'Unregistered user.' })
  @ApiNotFoundResponse({ description: 'Form not found.' })
  @ApiBearerAuth('access-token')
  @ApiResponse({ status: 200, description: "{ message: 'Form deleted' }" })
  @Delete('questionario/:id')
  async remove(@Param('id') id: string, @Req() req: { user: UserJwt }) {
    return await this.formsService.remove(req.user, +id);
  }
}

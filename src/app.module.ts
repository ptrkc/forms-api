import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { FormsModule } from './forms/forms.module';
import { QuestionsModule } from './questions/questions.module';
import { AnswersModule } from './answers/answers.module';
import { typeOrmConfig } from './config/typeOrm.config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UsersModule,
    FormsModule,
    QuestionsModule,
    AnswersModule,
    AuthModule,
  ],
})
export class AppModule {}

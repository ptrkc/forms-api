import { Module } from '@nestjs/common';
import {
  InjectDataSource,
  InjectRepository,
  TypeOrmModule,
} from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Form } from 'src/forms/form.entity';
import { Question } from 'src/questions/question.entity';
import { User, UserRoles } from 'src/users/user.entity';
import { faker } from '@faker-js/faker';
import { Answer } from 'src/answers/answer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Form, Question, Answer])],
})
export class SeedModule {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Form)
    private formsRepository: Repository<Form>,
    @InjectDataSource() private readonly dataSource: DataSource,
  ) {}
  async seed() {
    console.log('\n\nSeeding the database...\n\n');
    await this.dataSource.query(`
    TRUNCATE TABLE "answers", "questions", "forms", "users"
    `);

    const user1 = new User();
    user1.id = 1;
    user1.name = 'Admin';
    user1.role = UserRoles.admin;
    user1.cpf = '00000000000';
    user1.password = 'senha';
    const user2 = new User();
    user1.id = 2;
    user2.name = 'Pedro';
    user2.role = UserRoles.user;
    user2.cpf = '11111111111';
    user2.password = 'senha';
    const user3 = new User();
    user1.id = 3;
    user3.name = 'Maria';
    user3.role = UserRoles.user;
    user3.cpf = '22222222222';
    user3.password = 'senha';
    await this.usersRepository.save([user1, user2, user3]);

    const forms = [...Array(35).keys()].map((_, i) => {
      const newForm = new Form();
      newForm.id = i;
      newForm.date = faker.date.between(1600000000000, 1660971000000);
      newForm.name = 'Qual seu favorito?';
      newForm.description = 'Escolha uma das duas opções';
      newForm.user = i % 2 ? user1 : user2;
      const question1 = new Question();
      question1.description = `Você prefere a cor ${faker.color.human()} ou ${faker.color.human()}?`;
      const question2 = new Question();
      question2.description = `Você prefere o nome ${faker.name.firstName()} ou ${faker.name.firstName()}?`;
      newForm.questions = [question1, question2];
      return newForm;
    });
    await this.formsRepository.save(forms);
  }
}

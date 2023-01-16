import { Form } from 'src/forms/form.entity';
import { Question } from 'src/questions/question.entity';
import { User } from 'src/users/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'answers' })
export class Answer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description?: string;

  @ManyToOne(() => Question, (question) => question.answers)
  question: Question;
  questioId: number;

  @ManyToOne(() => User, (user) => user.answers)
  user: User;
  userId: number;

  @ManyToOne(() => Form, (form) => form.answers)
  form: Form;
  formId: number;
}

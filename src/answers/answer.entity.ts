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

  @ManyToOne(() => Question, (question) => question.answers, {
    onDelete: 'CASCADE',
  })
  question: Question;

  @ManyToOne(() => User, (user) => user.answers, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Form, (form) => form.answers, { onDelete: 'CASCADE' })
  form: Form;
}

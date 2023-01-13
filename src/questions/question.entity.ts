import { Answer } from 'src/answers/answer.entity';
import { Form } from 'src/forms/form.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column()
  questionId: number;

  @ManyToOne(() => Form, (form) => form.questions)
  form: Form;

  @OneToMany(() => Answer, (answer) => answer.question)
  answers: Answer[];
}

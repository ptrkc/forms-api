import { Answer } from 'src/answers/answer.entity';
import { Form } from 'src/forms/form.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'questions' })
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @ManyToOne(() => Form, (form) => form.questions, { onDelete: 'CASCADE' })
  form: Form;

  @OneToMany(() => Answer, (answer) => answer.question, {
    cascade: ['remove'],
  })
  answers: Answer[];
}

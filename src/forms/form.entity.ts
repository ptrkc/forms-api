import { Answer } from 'src/answers/answer.entity';
import { Question } from 'src/questions/question.entity';
import { User } from 'src/users/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'forms' })
export class Form {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => User, (user) => user.forms)
  user: User;

  @OneToMany(() => Question, (question) => question.form, {
    cascade: true,
  })
  questions: Question[];

  @OneToMany(() => Answer, (answer) => answer.form, {
    onUpdate: 'CASCADE',
  })
  answers: Answer[];
}

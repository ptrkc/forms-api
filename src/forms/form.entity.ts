import { Question } from 'src/questions/question.entity';
import { User } from 'src/users/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
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

  @OneToMany(() => Question, (question) => question.form)
  questions: Question[];
}

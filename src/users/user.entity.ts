import { Answer } from 'src/answers/answer.entity';
import { Form } from 'src/forms/form.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  BeforeInsert,
} from 'typeorm';
import { hashSync } from 'bcrypt';

enum Roles {
  user = 'user',
  admin = 'admin',
}

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: Roles, default: Roles.user })
  role: Roles;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column({ unique: true })
  cpf: string;

  @OneToMany(() => Form, (form) => form.user, { onDelete: 'CASCADE' })
  forms: Form[];

  @OneToMany(() => Answer, (answer) => answer.user)
  answers: Answer[];

  @BeforeInsert()
  hashPassword() {
    this.password = hashSync(this.password, 10);
  }
}

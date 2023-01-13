import { Answer } from 'src/answers/answer.entity';
import { Form } from 'src/forms/form.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

enum Roles {
  user = 'user',
  admin = 'admin',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: Roles, default: Roles.user })
  role: Roles;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  cpf: string;

  @OneToMany(() => Form, (form) => form.user, { onDelete: 'CASCADE' })
  forms: Form[];

  @OneToMany(() => Answer, (answer) => answer.user)
  answers: Answer[];
}

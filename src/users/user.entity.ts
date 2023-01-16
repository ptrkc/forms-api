import { Answer } from 'src/answers/answer.entity';
import { Form } from 'src/forms/form.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { hash } from 'bcrypt';
import { ApiProperty } from '@nestjs/swagger';

enum Roles {
  user = 'user',
  admin = 'admin',
}

@Entity({ name: 'users' })
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty()
  @Column({ type: 'enum', enum: Roles, default: Roles.user })
  role: Roles;
  @ApiProperty()
  @Column()
  name: string;

  @Column()
  password: string;
  @ApiProperty()
  @Column({ unique: true })
  cpf: string;

  @OneToMany(() => Form, (form) => form.user, {
    onDelete: 'CASCADE',
    cascade: ['remove'],
  })
  forms: Form[];

  @OneToMany(() => Answer, (answer) => answer.user)
  answers: Answer[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      this.password = await hash(this.password, 10);
    }
  }
}

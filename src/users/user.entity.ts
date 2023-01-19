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
import { Token } from 'src/tokens/token.entity';

export enum UserRoles {
  user = 'user',
  admin = 'admin',
}

@Entity({ name: 'users' })
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty()
  @Column({ type: 'enum', enum: UserRoles, default: UserRoles.user })
  role: UserRoles;
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

  @OneToMany(() => Token, (token) => token.user)
  tokens: Token[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      this.password = await hash(this.password, 10);
    }
  }
}

import { MigrationInterface, QueryRunner } from "typeorm";

export class GenerateTables1673966555072 implements MigrationInterface {
    name = 'GenerateTables1673966555072'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "questions" ("id" SERIAL NOT NULL, "description" character varying NOT NULL, "formId" integer, CONSTRAINT "PK_08a6d4b0f49ff300bf3a0ca60ac" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "role" "public"."users_role_enum" NOT NULL DEFAULT 'user', "name" character varying NOT NULL, "password" character varying NOT NULL, "cpf" character varying NOT NULL, CONSTRAINT "UQ_230b925048540454c8b4c481e1c" UNIQUE ("cpf"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "forms" ("id" SERIAL NOT NULL, "date" TIMESTAMP NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "userId" integer, CONSTRAINT "PK_ba062fd30b06814a60756f233da" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "answers" ("id" SERIAL NOT NULL, "description" character varying NOT NULL, "questionId" integer, "userId" integer, "formId" integer, CONSTRAINT "PK_9c32cec6c71e06da0254f2226c6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "questions" ADD CONSTRAINT "FK_e635f8de2abc09c58f97c5ce70e" FOREIGN KEY ("formId") REFERENCES "forms"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "forms" ADD CONSTRAINT "FK_08f0ffcce17394ec4aafcbed2f9" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "answers" ADD CONSTRAINT "FK_c38697a57844f52584abdb878d7" FOREIGN KEY ("questionId") REFERENCES "questions"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "answers" ADD CONSTRAINT "FK_1bd66b7e0599333e61d2e3e1678" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "answers" ADD CONSTRAINT "FK_7128c604a8af5e58b3e076132c8" FOREIGN KEY ("formId") REFERENCES "forms"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "answers" DROP CONSTRAINT "FK_7128c604a8af5e58b3e076132c8"`);
        await queryRunner.query(`ALTER TABLE "answers" DROP CONSTRAINT "FK_1bd66b7e0599333e61d2e3e1678"`);
        await queryRunner.query(`ALTER TABLE "answers" DROP CONSTRAINT "FK_c38697a57844f52584abdb878d7"`);
        await queryRunner.query(`ALTER TABLE "forms" DROP CONSTRAINT "FK_08f0ffcce17394ec4aafcbed2f9"`);
        await queryRunner.query(`ALTER TABLE "questions" DROP CONSTRAINT "FK_e635f8de2abc09c58f97c5ce70e"`);
        await queryRunner.query(`DROP TABLE "answers"`);
        await queryRunner.query(`DROP TABLE "forms"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "questions"`);
    }

}

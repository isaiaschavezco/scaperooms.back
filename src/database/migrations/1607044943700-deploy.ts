import {MigrationInterface, QueryRunner} from "typeorm";

export class deploy1607044943700 implements MigrationInterface {
    name = 'deploy1607044943700'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Trivia"."target" ADD "clinicId" integer`);
        await queryRunner.query(`ALTER TABLE "Users"."user" ADD "clinicId" integer`);
        await queryRunner.query(`COMMENT ON COLUMN "Content"."article"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "Content"."submenu"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "Trivia"."question"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "Content"."trade"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "Trivia"."pointsbyuser"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "Trivia"."quizz"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "Trivia"."campaing"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "Users"."notificacion"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "Users"."sesion"."loggedInAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "Users"."user"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "Content"."message"."createdAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "Trivia"."target" ADD CONSTRAINT "FK_d4e1dd8524af8bfd8b6d075cd6a" FOREIGN KEY ("clinicId") REFERENCES "Users"."clinic"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Users"."user" ADD CONSTRAINT "FK_8bb7d70677b798f4de5d8c41664" FOREIGN KEY ("clinicId") REFERENCES "Users"."clinic"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Users"."user" DROP CONSTRAINT "FK_8bb7d70677b798f4de5d8c41664"`);
        await queryRunner.query(`ALTER TABLE "Trivia"."target" DROP CONSTRAINT "FK_d4e1dd8524af8bfd8b6d075cd6a"`);
        await queryRunner.query(`COMMENT ON COLUMN "Content"."message"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "Users"."user"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "Users"."sesion"."loggedInAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "Users"."notificacion"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "Trivia"."campaing"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "Trivia"."quizz"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "Trivia"."pointsbyuser"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "Content"."trade"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "Trivia"."question"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "Content"."submenu"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "Content"."article"."createdAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "Users"."user" DROP COLUMN "clinicId"`);
        await queryRunner.query(`ALTER TABLE "Trivia"."target" DROP COLUMN "clinicId"`);
    }

}

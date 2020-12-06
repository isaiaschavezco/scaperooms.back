import {MigrationInterface, QueryRunner} from "typeorm";

export class prueba1607232902598 implements MigrationInterface {
    name = 'prueba1607232902598'

    public async up(queryRunner: QueryRunner): Promise<void> {
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
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
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
    }

}

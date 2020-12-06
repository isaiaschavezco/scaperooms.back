import {MigrationInterface, QueryRunner} from "typeorm";

export class esthederm1607202231582 implements MigrationInterface {
    name = 'esthederm1607202231582'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Content"."article" ADD "isBlogEsthederm" boolean`);
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
        await queryRunner.query(`ALTER TABLE "Content"."article" DROP COLUMN "isBlogEsthederm"`);
    }

}

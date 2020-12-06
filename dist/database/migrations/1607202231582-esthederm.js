"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class esthederm1607202231582 {
    constructor() {
        this.name = 'esthederm1607202231582';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "Content"."article" ADD "isBlogEsthederm" boolean`);
            yield queryRunner.query(`COMMENT ON COLUMN "Content"."article"."createdAt" IS NULL`);
            yield queryRunner.query(`COMMENT ON COLUMN "Content"."submenu"."createdAt" IS NULL`);
            yield queryRunner.query(`COMMENT ON COLUMN "Trivia"."question"."createdAt" IS NULL`);
            yield queryRunner.query(`COMMENT ON COLUMN "Content"."trade"."createdAt" IS NULL`);
            yield queryRunner.query(`COMMENT ON COLUMN "Trivia"."pointsbyuser"."createdAt" IS NULL`);
            yield queryRunner.query(`COMMENT ON COLUMN "Trivia"."quizz"."createdAt" IS NULL`);
            yield queryRunner.query(`COMMENT ON COLUMN "Trivia"."campaing"."createdAt" IS NULL`);
            yield queryRunner.query(`COMMENT ON COLUMN "Users"."notificacion"."createdAt" IS NULL`);
            yield queryRunner.query(`COMMENT ON COLUMN "Users"."sesion"."loggedInAt" IS NULL`);
            yield queryRunner.query(`COMMENT ON COLUMN "Users"."user"."createdAt" IS NULL`);
            yield queryRunner.query(`COMMENT ON COLUMN "Content"."message"."createdAt" IS NULL`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`COMMENT ON COLUMN "Content"."message"."createdAt" IS NULL`);
            yield queryRunner.query(`COMMENT ON COLUMN "Users"."user"."createdAt" IS NULL`);
            yield queryRunner.query(`COMMENT ON COLUMN "Users"."sesion"."loggedInAt" IS NULL`);
            yield queryRunner.query(`COMMENT ON COLUMN "Users"."notificacion"."createdAt" IS NULL`);
            yield queryRunner.query(`COMMENT ON COLUMN "Trivia"."campaing"."createdAt" IS NULL`);
            yield queryRunner.query(`COMMENT ON COLUMN "Trivia"."quizz"."createdAt" IS NULL`);
            yield queryRunner.query(`COMMENT ON COLUMN "Trivia"."pointsbyuser"."createdAt" IS NULL`);
            yield queryRunner.query(`COMMENT ON COLUMN "Content"."trade"."createdAt" IS NULL`);
            yield queryRunner.query(`COMMENT ON COLUMN "Trivia"."question"."createdAt" IS NULL`);
            yield queryRunner.query(`COMMENT ON COLUMN "Content"."submenu"."createdAt" IS NULL`);
            yield queryRunner.query(`COMMENT ON COLUMN "Content"."article"."createdAt" IS NULL`);
            yield queryRunner.query(`ALTER TABLE "Content"."article" DROP COLUMN "isBlogEsthederm"`);
        });
    }
}
exports.esthederm1607202231582 = esthederm1607202231582;
//# sourceMappingURL=1607202231582-esthederm.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const question_entity_1 = require("../question/question.entity");
const campaing_entity_1 = require("../campaing/campaing.entity");
const user_entity_1 = require("../../users/user/user.entity");
const pointsbyuser_entity_1 = require("../pointsbyuser/pointsbyuser.entity");
const answerbyuserquizz_entity_1 = require("../answerbyuserquizz/answerbyuserquizz.entity");
let Quizz = class Quizz {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Quizz.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ length: 100 }),
    __metadata("design:type", String)
], Quizz.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ type: "timestamp without time zone", default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], Quizz.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.Column({ type: "timestamp without time zone", nullable: true }),
    __metadata("design:type", Date)
], Quizz.prototype, "startedAt", void 0);
__decorate([
    typeorm_1.Column({ type: "timestamp without time zone", nullable: true }),
    __metadata("design:type", Date)
], Quizz.prototype, "finishedAt", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], Quizz.prototype, "isActive", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], Quizz.prototype, "isDeleted", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], Quizz.prototype, "isSend", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Quizz.prototype, "points", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Quizz.prototype, "time", void 0);
__decorate([
    typeorm_1.OneToMany(type => question_entity_1.Question, question => question.quizz),
    __metadata("design:type", Array)
], Quizz.prototype, "question", void 0);
__decorate([
    typeorm_1.ManyToOne(type => campaing_entity_1.Campaing, campaing => campaing.quizz),
    __metadata("design:type", campaing_entity_1.Campaing)
], Quizz.prototype, "campaing", void 0);
__decorate([
    typeorm_1.ManyToMany(type => user_entity_1.User, user => user.quizz),
    typeorm_1.JoinTable({ name: "quizzesByUser" }),
    __metadata("design:type", Array)
], Quizz.prototype, "user", void 0);
__decorate([
    typeorm_1.OneToMany(type => pointsbyuser_entity_1.Pointsbyuser, pointsbyuser => pointsbyuser.quizz),
    __metadata("design:type", Array)
], Quizz.prototype, "pointsbyuser", void 0);
__decorate([
    typeorm_1.OneToMany(type => answerbyuserquizz_entity_1.Answerbyuserquizz, answerbyuserquizz => answerbyuserquizz.quizz),
    __metadata("design:type", Array)
], Quizz.prototype, "answerbyuserquizz", void 0);
Quizz = __decorate([
    typeorm_1.Entity({ schema: 'Trivia' })
], Quizz);
exports.Quizz = Quizz;
//# sourceMappingURL=quizz.entity.js.map
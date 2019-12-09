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
const user_entity_1 = require("../../users/user/user.entity");
const quizz_entity_1 = require("../quizz/quizz.entity");
let Answerbyuserquizz = class Answerbyuserquizz {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], Answerbyuserquizz.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ type: "text" }),
    __metadata("design:type", String)
], Answerbyuserquizz.prototype, "answer", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Answerbyuserquizz.prototype, "points", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], Answerbyuserquizz.prototype, "isActive", void 0);
__decorate([
    typeorm_1.ManyToOne(type => user_entity_1.User, user => user.answerbyuserquizz),
    __metadata("design:type", user_entity_1.User)
], Answerbyuserquizz.prototype, "user", void 0);
__decorate([
    typeorm_1.ManyToOne(type => quizz_entity_1.Quizz, quizz => quizz.answerbyuserquizz),
    __metadata("design:type", quizz_entity_1.Quizz)
], Answerbyuserquizz.prototype, "quizz", void 0);
Answerbyuserquizz = __decorate([
    typeorm_1.Entity({ schema: 'Trivia' })
], Answerbyuserquizz);
exports.Answerbyuserquizz = Answerbyuserquizz;
//# sourceMappingURL=answerbyuserquizz.entity.js.map
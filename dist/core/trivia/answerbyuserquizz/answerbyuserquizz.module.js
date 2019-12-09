"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const answerbyuserquizz_entity_1 = require("./answerbyuserquizz.entity");
const quizz_entity_1 = require("../quizz/quizz.entity");
const points_type_entity_1 = require("../points-type/points-type.entity");
const pointsbyuser_entity_1 = require("../pointsbyuser/pointsbyuser.entity");
const user_entity_1 = require("../../users/user/user.entity");
const answerbyuserquizz_service_1 = require("./answerbyuserquizz.service");
const answerbyuserquizz_controller_1 = require("./answerbyuserquizz.controller");
let AnswerbyuserquizzModule = class AnswerbyuserquizzModule {
};
AnswerbyuserquizzModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([answerbyuserquizz_entity_1.Answerbyuserquizz]),
            typeorm_1.TypeOrmModule.forFeature([quizz_entity_1.Quizz]),
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User]),
            typeorm_1.TypeOrmModule.forFeature([pointsbyuser_entity_1.Pointsbyuser]),
            typeorm_1.TypeOrmModule.forFeature([points_type_entity_1.PointsType])
        ],
        providers: [answerbyuserquizz_service_1.AnswerbyuserquizzService],
        controllers: [answerbyuserquizz_controller_1.AnswerbyuserquizzController]
    })
], AnswerbyuserquizzModule);
exports.AnswerbyuserquizzModule = AnswerbyuserquizzModule;
//# sourceMappingURL=answerbyuserquizz.module.js.map
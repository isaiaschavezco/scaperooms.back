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
const quizz_service_1 = require("./quizz.service");
const quizz_controller_1 = require("./quizz.controller");
const quizz_entity_1 = require("./quizz.entity");
const user_entity_1 = require("../../users/user/user.entity");
const campaing_entity_1 = require("../campaing/campaing.entity");
const pointsbyuser_entity_1 = require("../pointsbyuser/pointsbyuser.entity");
let QuizzModule = class QuizzModule {
};
QuizzModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([quizz_entity_1.Quizz]),
            typeorm_1.TypeOrmModule.forFeature([campaing_entity_1.Campaing]),
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User]),
            typeorm_1.TypeOrmModule.forFeature([pointsbyuser_entity_1.Pointsbyuser])
        ],
        providers: [quizz_service_1.QuizzService],
        controllers: [quizz_controller_1.QuizzController]
    })
], QuizzModule);
exports.QuizzModule = QuizzModule;
//# sourceMappingURL=quizz.module.js.map
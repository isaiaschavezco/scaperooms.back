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
const user_service_1 = require("./user.service");
const user_controller_1 = require("./user.controller");
const user_entity_1 = require("./user.entity");
const token_entity_1 = require("../token/token.entity");
const type_entity_1 = require("../type/type.entity");
const chain_entity_1 = require("../chain/chain.entity");
const clinic_entity_1 = require("./../clinic/clinic.entity");
const position_entity_1 = require("../position/position.entity");
const city_entity_1 = require("../city/city.entity");
const delegation_entity_1 = require("../delegation/delegation.entity");
const role_entity_1 = require("../role/role.entity");
const sesion_entity_1 = require("../sesion/sesion.entity");
const configuration_entity_1 = require("../configuration/configuration.entity");
const quizz_entity_1 = require("../../trivia/quizz/quizz.entity");
const campaing_entity_1 = require("../../trivia/campaing/campaing.entity");
const target_entity_1 = require("../../trivia/target/target.entity");
let UserModule = class UserModule {
};
UserModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User]),
            typeorm_1.TypeOrmModule.forFeature([campaing_entity_1.Campaing]),
            typeorm_1.TypeOrmModule.forFeature([quizz_entity_1.Quizz]),
            typeorm_1.TypeOrmModule.forFeature([target_entity_1.Target]),
            typeorm_1.TypeOrmModule.forFeature([token_entity_1.Token]),
            typeorm_1.TypeOrmModule.forFeature([type_entity_1.Type]),
            typeorm_1.TypeOrmModule.forFeature([chain_entity_1.Chain]),
            typeorm_1.TypeOrmModule.forFeature([clinic_entity_1.Clinic]),
            typeorm_1.TypeOrmModule.forFeature([position_entity_1.Position]),
            typeorm_1.TypeOrmModule.forFeature([city_entity_1.City]),
            typeorm_1.TypeOrmModule.forFeature([delegation_entity_1.Delegation]),
            typeorm_1.TypeOrmModule.forFeature([role_entity_1.Role]),
            typeorm_1.TypeOrmModule.forFeature([sesion_entity_1.Sesion]),
            typeorm_1.TypeOrmModule.forFeature([configuration_entity_1.Configuration])
        ],
        providers: [user_service_1.UserService],
        controllers: [user_controller_1.UserController]
    })
], UserModule);
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map
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
const sesion_controller_1 = require("./sesion.controller");
const sesion_service_1 = require("./sesion.service");
const sesion_entity_1 = require("./sesion.entity");
const user_entity_1 = require("../user/user.entity");
let SesionModule = class SesionModule {
};
SesionModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([sesion_entity_1.Sesion]),
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User])
        ],
        controllers: [sesion_controller_1.SesionController],
        providers: [sesion_service_1.SesionService]
    })
], SesionModule);
exports.SesionModule = SesionModule;
//# sourceMappingURL=sesion.module.js.map
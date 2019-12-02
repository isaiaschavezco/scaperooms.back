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
const target_service_1 = require("./target.service");
const target_controller_1 = require("./target.controller");
const target_entity_1 = require("./target.entity");
const city_entity_1 = require("../../users/city/city.entity");
const chain_entity_1 = require("../../users/chain/chain.entity");
const type_entity_1 = require("../../users/type/type.entity");
const position_entity_1 = require("../../users/position/position.entity");
let TargetModule = class TargetModule {
};
TargetModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([target_entity_1.Target]),
            typeorm_1.TypeOrmModule.forFeature([city_entity_1.City]),
            typeorm_1.TypeOrmModule.forFeature([chain_entity_1.Chain]),
            typeorm_1.TypeOrmModule.forFeature([type_entity_1.Type]),
            typeorm_1.TypeOrmModule.forFeature([position_entity_1.Position])
        ],
        providers: [target_service_1.TargetService],
        controllers: [target_controller_1.TargetController]
    })
], TargetModule);
exports.TargetModule = TargetModule;
//# sourceMappingURL=target.module.js.map
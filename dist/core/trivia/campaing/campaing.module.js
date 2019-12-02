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
const campaing_service_1 = require("./campaing.service");
const campaing_controller_1 = require("./campaing.controller");
const campaing_entity_1 = require("./campaing.entity");
const target_entity_1 = require("../target/target.entity");
let CampaingModule = class CampaingModule {
};
CampaingModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([campaing_entity_1.Campaing]),
            typeorm_1.TypeOrmModule.forFeature([target_entity_1.Target])
        ],
        providers: [campaing_service_1.CampaingService],
        controllers: [campaing_controller_1.CampaingController]
    })
], CampaingModule);
exports.CampaingModule = CampaingModule;
//# sourceMappingURL=campaing.module.js.map
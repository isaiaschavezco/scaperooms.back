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
const pointsbyuser_service_1 = require("./pointsbyuser.service");
const pointsbyuser_controller_1 = require("./pointsbyuser.controller");
const pointsbyuser_entity_1 = require("./pointsbyuser.entity");
let PointsbyuserModule = class PointsbyuserModule {
};
PointsbyuserModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([pointsbyuser_entity_1.Pointsbyuser])
        ],
        providers: [pointsbyuser_service_1.PointsbyuserService],
        controllers: [pointsbyuser_controller_1.PointsbyuserController]
    })
], PointsbyuserModule);
exports.PointsbyuserModule = PointsbyuserModule;
//# sourceMappingURL=pointsbyuser.module.js.map
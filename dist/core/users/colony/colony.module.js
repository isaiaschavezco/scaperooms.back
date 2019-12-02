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
const colony_service_1 = require("./colony.service");
const colony_controller_1 = require("./colony.controller");
const colony_entity_1 = require("./colony.entity");
let ColonyModule = class ColonyModule {
};
ColonyModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([colony_entity_1.Colony])],
        providers: [colony_service_1.ColonyService],
        controllers: [colony_controller_1.ColonyController]
    })
], ColonyModule);
exports.ColonyModule = ColonyModule;
//# sourceMappingURL=colony.module.js.map
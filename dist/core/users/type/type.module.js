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
const type_service_1 = require("./type.service");
const type_controller_1 = require("./type.controller");
const type_entity_1 = require("./type.entity");
let TypeModule = class TypeModule {
};
TypeModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([type_entity_1.Type])],
        providers: [type_service_1.TypeService],
        controllers: [type_controller_1.TypeController]
    })
], TypeModule);
exports.TypeModule = TypeModule;
//# sourceMappingURL=type.module.js.map
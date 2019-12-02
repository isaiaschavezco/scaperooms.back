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
const token_service_1 = require("./token.service");
const token_controller_1 = require("./token.controller");
const token_entity_1 = require("./token.entity");
let TokenModule = class TokenModule {
};
TokenModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([token_entity_1.Token])],
        providers: [token_service_1.TokenService],
        controllers: [token_controller_1.TokenController]
    })
], TokenModule);
exports.TokenModule = TokenModule;
//# sourceMappingURL=token.module.js.map
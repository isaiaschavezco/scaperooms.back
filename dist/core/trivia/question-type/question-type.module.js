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
const question_type_service_1 = require("./question-type.service");
const question_type_controller_1 = require("./question-type.controller");
const question_type_entity_1 = require("./question-type.entity");
let QuestionTypeModule = class QuestionTypeModule {
};
QuestionTypeModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([question_type_entity_1.QuestionType])],
        providers: [question_type_service_1.QuestionTypeService],
        controllers: [question_type_controller_1.QuestionTypeController]
    })
], QuestionTypeModule);
exports.QuestionTypeModule = QuestionTypeModule;
//# sourceMappingURL=question-type.module.js.map
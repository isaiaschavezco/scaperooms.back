"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const question_service_1 = require("./question.service");
const question_dto_1 = require("./question.dto");
let QuestionController = class QuestionController {
    constructor(questionService) {
        this.questionService = questionService;
    }
    getAllQuestions() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.questionService.findAll();
        });
    }
    getAllByCampaing(quizzId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.questionService.findAllByQuizz(quizzId);
        });
    }
    getQuestionDetailById(questionId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.questionService.getQuestionDetailById(questionId);
        });
    }
    getAllByUserQuizz(quizzId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.questionService.findAllByUserQuizz(quizzId);
        });
    }
    createQuestion(createQuestionDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.questionService.create(createQuestionDTO);
        });
    }
    updateQuestion(updateQuestionDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.questionService.update(updateQuestionDTO);
        });
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], QuestionController.prototype, "getAllQuestions", null);
__decorate([
    common_1.Get(':quizzId'),
    __param(0, common_1.Param('quizzId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], QuestionController.prototype, "getAllByCampaing", null);
__decorate([
    common_1.Get('detail/:questionId'),
    __param(0, common_1.Param('questionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], QuestionController.prototype, "getQuestionDetailById", null);
__decorate([
    common_1.Get('quizz/:quizzId'),
    __param(0, common_1.Param('quizzId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], QuestionController.prototype, "getAllByUserQuizz", null);
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [question_dto_1.CreateQuestionDTO]),
    __metadata("design:returntype", Promise)
], QuestionController.prototype, "createQuestion", null);
__decorate([
    common_1.Put(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [question_dto_1.UpdateQuestionDTO]),
    __metadata("design:returntype", Promise)
], QuestionController.prototype, "updateQuestion", null);
QuestionController = __decorate([
    common_1.Controller('question'),
    __metadata("design:paramtypes", [question_service_1.QuestionService])
], QuestionController);
exports.QuestionController = QuestionController;
//# sourceMappingURL=question.controller.js.map
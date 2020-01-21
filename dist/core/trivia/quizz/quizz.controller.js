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
const quizz_service_1 = require("./quizz.service");
const quizz_dto_1 = require("./quizz.dto");
let QuizzController = class QuizzController {
    constructor(quizzService) {
        this.quizzService = quizzService;
    }
    getAllQuizzes() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.quizzService.findAll();
        });
    }
    getAllByCampaing(campaingId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.quizzService.findAllByCampaing(campaingId);
        });
    }
    createQuizz(createQuizzDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.quizzService.create(createQuizzDTO);
        });
    }
    sendQuizz(sendQuizzDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.quizzService.send(sendQuizzDTO);
        });
    }
    getQuizzesByUserCampaing(getQuizzesByUserCampaingDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.quizzService.findQuizzesByUserCampaing(getQuizzesByUserCampaingDTO);
        });
    }
    deleteQuizz(quizzId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.quizzService.delete(quizzId);
        });
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], QuizzController.prototype, "getAllQuizzes", null);
__decorate([
    common_1.Get(':campaingId'),
    __param(0, common_1.Param('campaingId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], QuizzController.prototype, "getAllByCampaing", null);
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [quizz_dto_1.CreateQuizzDTO]),
    __metadata("design:returntype", Promise)
], QuizzController.prototype, "createQuizz", null);
__decorate([
    common_1.Post('send'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [quizz_dto_1.SendQuizzDTO]),
    __metadata("design:returntype", Promise)
], QuizzController.prototype, "sendQuizz", null);
__decorate([
    common_1.Post('user'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [quizz_dto_1.GetQuizzesByUserCampaingDTO]),
    __metadata("design:returntype", Promise)
], QuizzController.prototype, "getQuizzesByUserCampaing", null);
__decorate([
    common_1.Delete(':quizzId'),
    __param(0, common_1.Param('quizzId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], QuizzController.prototype, "deleteQuizz", null);
QuizzController = __decorate([
    common_1.Controller('quizz'),
    __metadata("design:paramtypes", [quizz_service_1.QuizzService])
], QuizzController);
exports.QuizzController = QuizzController;
//# sourceMappingURL=quizz.controller.js.map
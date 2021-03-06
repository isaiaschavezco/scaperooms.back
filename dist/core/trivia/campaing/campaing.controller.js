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
const campaing_service_1 = require("./campaing.service");
const campaing_dto_1 = require("./campaing.dto");
let CampaingController = class CampaingController {
    constructor(campaingService) {
        this.campaingService = campaingService;
    }
    getAllCampaings() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.campaingService.findAll();
        });
    }
    getAllActiveCampaings(isBioderma) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.campaingService.findAllActives(isBioderma);
        });
    }
    getCampaingReport(campaingId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.campaingService.generateCampaingReport(campaingId);
        });
    }
    getCampaingTop(campaingId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.campaingService.findTopCampaing(campaingId);
        });
    }
    updateCampaing(updateCampaingDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.campaingService.update(updateCampaingDTO);
        });
    }
    findCampaingsByUser(getCampaingsByUserDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.campaingService.findCampaingsByUser(getCampaingsByUserDTO);
        });
    }
    createCampaing(createCampaingDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.campaingService.create(createCampaingDTO);
        });
    }
    getUserCampaingHistory(getUserCampaingHistory) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.campaingService.getCampaingUserHistoy(getUserCampaingHistory);
        });
    }
    deleteCampaing(removeCampaingDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.campaingService.delete(removeCampaingDTO);
        });
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CampaingController.prototype, "getAllCampaings", null);
__decorate([
    common_1.Get(':isBioderma'),
    __param(0, common_1.Param('isBioderma')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CampaingController.prototype, "getAllActiveCampaings", null);
__decorate([
    common_1.Get('report/:campaingId'),
    __param(0, common_1.Param('campaingId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CampaingController.prototype, "getCampaingReport", null);
__decorate([
    common_1.Get(':campaingId/top'),
    __param(0, common_1.Param('campaingId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CampaingController.prototype, "getCampaingTop", null);
__decorate([
    common_1.Put(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [campaing_dto_1.UpdateCampaingDTO]),
    __metadata("design:returntype", Promise)
], CampaingController.prototype, "updateCampaing", null);
__decorate([
    common_1.Post('user'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [campaing_dto_1.GetCampaingsByUserDTO]),
    __metadata("design:returntype", Promise)
], CampaingController.prototype, "findCampaingsByUser", null);
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [campaing_dto_1.CreateCampaingDTO]),
    __metadata("design:returntype", Promise)
], CampaingController.prototype, "createCampaing", null);
__decorate([
    common_1.Post('history'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [campaing_dto_1.GetUserCampaingHistory]),
    __metadata("design:returntype", Promise)
], CampaingController.prototype, "getUserCampaingHistory", null);
__decorate([
    common_1.Put('remove'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [campaing_dto_1.RemoveCampaingDTO]),
    __metadata("design:returntype", Promise)
], CampaingController.prototype, "deleteCampaing", null);
CampaingController = __decorate([
    common_1.Controller('campaing'),
    __metadata("design:paramtypes", [campaing_service_1.CampaingService])
], CampaingController);
exports.CampaingController = CampaingController;
//# sourceMappingURL=campaing.controller.js.map
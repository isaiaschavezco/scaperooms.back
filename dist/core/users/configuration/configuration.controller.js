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
const configuration_service_1 = require("./configuration.service");
const configuration_dto_1 = require("./configuration.dto");
let ConfigutarionController = class ConfigutarionController {
    constructor(configutarionService) {
        this.configutarionService = configutarionService;
    }
    findGeneralConfiguration() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.configutarionService.findGeneralConfiguration();
        });
    }
    findClubStatus() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.configutarionService.findClubStatus();
        });
    }
    updateClubBiodermaStatus(updateClubStatusDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.configutarionService.updateClub(updateClubStatusDTO);
        });
    }
    findThemeColor() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.configutarionService.findThemeColor();
        });
    }
    updateThemeColor(updateThemeDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.configutarionService.updateTheme(updateThemeDTO);
        });
    }
    findBiodermaGameStatus() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.configutarionService.findBiodermaGameStatus();
        });
    }
    updateBiodermaStatus(updateBiodermaGameStatusDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.configutarionService.updateBiodermaGame(updateBiodermaGameStatusDTO);
        });
    }
    findBiodermaGameImage() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.configutarionService.findBiodermaGameImage();
        });
    }
    updateBiodermaImage(updateBiodermaGameImageDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.configutarionService.updateBiodermaGameImage(updateBiodermaGameImageDTO);
        });
    }
};
__decorate([
    common_1.Get('general'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ConfigutarionController.prototype, "findGeneralConfiguration", null);
__decorate([
    common_1.Get('club'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ConfigutarionController.prototype, "findClubStatus", null);
__decorate([
    common_1.Post('club'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [configuration_dto_1.UpdateClubStatusDTO]),
    __metadata("design:returntype", Promise)
], ConfigutarionController.prototype, "updateClubBiodermaStatus", null);
__decorate([
    common_1.Get('theme'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ConfigutarionController.prototype, "findThemeColor", null);
__decorate([
    common_1.Post('theme'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [configuration_dto_1.UpdateThemeDTO]),
    __metadata("design:returntype", Promise)
], ConfigutarionController.prototype, "updateThemeColor", null);
__decorate([
    common_1.Get('bioderma'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ConfigutarionController.prototype, "findBiodermaGameStatus", null);
__decorate([
    common_1.Post('bioderma'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [configuration_dto_1.UpdateBiodermaGameStatusDTO]),
    __metadata("design:returntype", Promise)
], ConfigutarionController.prototype, "updateBiodermaStatus", null);
__decorate([
    common_1.Get('image'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ConfigutarionController.prototype, "findBiodermaGameImage", null);
__decorate([
    common_1.Post('image'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [configuration_dto_1.UpdateBiodermaGameImageDTO]),
    __metadata("design:returntype", Promise)
], ConfigutarionController.prototype, "updateBiodermaImage", null);
ConfigutarionController = __decorate([
    common_1.Controller('configutarion'),
    __metadata("design:paramtypes", [configuration_service_1.ConfigutarionService])
], ConfigutarionController);
exports.ConfigutarionController = ConfigutarionController;
//# sourceMappingURL=configuration.controller.js.map
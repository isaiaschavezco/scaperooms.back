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
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const configuration_entity_1 = require("./configuration.entity");
let ConfigutarionService = class ConfigutarionService {
    constructor(configurationRepository) {
        this.configurationRepository = configurationRepository;
    }
    findGeneralConfiguration() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const generalConfiguration = yield this.configurationRepository.findOne(1);
                return { general: generalConfiguration };
            }
            catch (err) {
                console.log("ConfigutarionService - findGeneralConfiguration: ", err);
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Error getting general status',
                }, 500);
            }
        });
    }
    findClubStatus() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const clubStatus = yield this.configurationRepository.findOne(1);
                return { statusCart: clubStatus.isClubBiodermaActive };
            }
            catch (err) {
                console.log("ConfigutarionService - findClubStatus: ", err);
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Error getting club status',
                }, 500);
            }
        });
    }
    findThemeColor() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const clubStatus = yield this.configurationRepository.findOne(1);
                let seasonColor = [];
                switch (clubStatus.themes) {
                    case 1:
                        seasonColor = [
                            '#449c44', '#f1f9f1', '#95db95', '#449c44', '#1c541c',
                            '#C8E8C8', '#F1F9F1'
                        ];
                        break;
                    case 2:
                        seasonColor = [
                            '#F99F28', '#FDFAF6', '#F99F28', '#AF6B11', '#734810',
                            '#FFDDB1', '#FDFAF6'
                        ];
                        break;
                    case 3:
                        seasonColor = [
                            '#D18E95', '#FAF6F7', '#D6717D', '#A31A29', '#7e101c',
                            '#EED0D3', '#FAF6F7'
                        ];
                        break;
                    case 4:
                        seasonColor = [
                            '#526987', '#EEF7FB', '#8AC6E1', '#009DE0', '#005980',
                            '#D0EDF9', '#EEF7FB'
                        ];
                        break;
                    default:
                        break;
                }
                return { seasonColors: seasonColor };
            }
            catch (err) {
                console.log("ConfigutarionService - findThemeColor: ", err);
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Error getting theme',
                }, 500);
            }
        });
    }
    findBiodermaGameStatus() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const clubStatus = yield this.configurationRepository.findOne(1);
                return { statusBioderma: clubStatus.isBiodermaGameActive };
            }
            catch (err) {
                console.log("ConfigutarionService - findBiodermaGameStatus: ", err);
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Error getting biodermagame status',
                }, 500);
            }
        });
    }
    findBiodermaGameImage() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const clubStatus = yield this.configurationRepository.findOne(1);
                return {
                    biodermaImage: clubStatus.biodermaGameImage,
                    biodermaGameCampaingImage: clubStatus.biodermaGameCampaingImage,
                    biodermaGameBlogImage: clubStatus.biodermaGameBlogImage
                };
            }
            catch (err) {
                console.log("ConfigutarionService - findBiodermaGameImage: ", err);
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Error getting biodermagame image',
                }, 500);
            }
        });
    }
    updateClub(updateClubStatusDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let configToUpdate = yield this.configurationRepository.findOne(1);
                configToUpdate.isClubBiodermaActive = updateClubStatusDTO.isClubBiodermaActive;
                yield this.configurationRepository.save(configToUpdate);
                return { status: 0 };
            }
            catch (err) {
                console.log("ConfigutarionService - updateClub: ", err);
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Error getting theme',
                }, 500);
            }
        });
    }
    updateTheme(updateThemeDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let configToUpdate = yield this.configurationRepository.findOne(1);
                configToUpdate.themes = updateThemeDTO.theme;
                yield this.configurationRepository.save(configToUpdate);
                return { status: 0 };
            }
            catch (err) {
                console.log("ConfigutarionService - updateTheme: ", err);
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Error getting theme',
                }, 500);
            }
        });
    }
    updateBiodermaGame(updateBiodermaGameStatusDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let configToUpdate = yield this.configurationRepository.findOne(1);
                configToUpdate.isBiodermaGameActive = updateBiodermaGameStatusDTO.isBiodermaGameActive;
                yield this.configurationRepository.save(configToUpdate);
                return { status: 0 };
            }
            catch (err) {
                console.log("ConfigutarionService - updateBiodermaGame: ", err);
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Error getting theme',
                }, 500);
            }
        });
    }
    updateBiodermaGameImage(updateBiodermaGameImageDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let configToUpdate = yield this.configurationRepository.findOne(1);
                configToUpdate.biodermaGameImage = updateBiodermaGameImageDTO.biodermaGameImage;
                yield this.configurationRepository.save(configToUpdate);
                return { status: 0 };
            }
            catch (err) {
                console.log("ConfigutarionService - updateBiodermaGameImage: ", err);
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Error setting image',
                }, 500);
            }
        });
    }
    updateBiodermaGameCampaingImage(imageRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let configToUpdate = yield this.configurationRepository.findOne(1);
                configToUpdate.biodermaGameCampaingImage = imageRequest.biodermaGameCampaingImage;
                yield this.configurationRepository.save(configToUpdate);
                return { status: 0 };
            }
            catch (err) {
                console.log("ConfigutarionService - updateBiodermaGameCampaingImage: ", err);
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Error setting image',
                }, 500);
            }
        });
    }
    updateBiodermaGameBlogImage(imageRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let configToUpdate = yield this.configurationRepository.findOne(1);
                configToUpdate.biodermaGameBlogImage = imageRequest.biodermaGameBlogImage;
                yield this.configurationRepository.save(configToUpdate);
                return { status: 0 };
            }
            catch (err) {
                console.log("ConfigutarionService - updateBiodermaGameBlogImage: ", err);
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Error setting image',
                }, 500);
            }
        });
    }
};
ConfigutarionService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(configuration_entity_1.Configuration)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ConfigutarionService);
exports.ConfigutarionService = ConfigutarionService;
//# sourceMappingURL=configuration.service.js.map
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
const campaing_entity_1 = require("./campaing.entity");
const target_entity_1 = require("../target/target.entity");
let CampaingService = class CampaingService {
    constructor(campaingRepository, targetRepository) {
        this.campaingRepository = campaingRepository;
        this.targetRepository = targetRepository;
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const campaingList = yield this.campaingRepository.find();
                return campaingList;
            }
            catch (err) {
                console.log("CampaingService - findAll: ", err);
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Error getting campaings',
                }, 500);
            }
        });
    }
    findAllActives(isBioderma) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const campaingList = yield this.campaingRepository.find({
                    where: { isDeleted: false, isBiodermaGame: isBioderma },
                    order: { createdAt: 'DESC' },
                    relations: ["target", "target.city", "target.delegation", "target.colony", "target.chain", "target.position", "target.type"]
                });
                return campaingList;
            }
            catch (err) {
                console.log("CampaingService - findAllActives: ", err);
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Error getting campaings',
                }, 500);
            }
        });
    }
    findTopCampaing(campaingId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.campaingRepository.findOne(campaingId, {
                    relations: ["quizz", "quizz.user", "quizz.user.chain"]
                });
                return response;
            }
            catch (err) {
                console.log("CampaingService - findTopCampaing: ", err);
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Error getting campaings',
                }, 500);
            }
        });
    }
    findCampaingsByUser(getCampaingsByUserDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.campaingRepository.createQueryBuilder("campaing")
                    .select(["campaing.id", "campaing.name", "campaing.portrait"])
                    .innerJoin("campaing.quizz", "quizz", "quizz.isActive = :isActive", { isActive: true })
                    .innerJoin("quizz.user", "user", "user.email = :email", { email: getCampaingsByUserDTO.email })
                    .where("campaing.isBiodermaGame = :isBiodermaGame", { isBiodermaGame: getCampaingsByUserDTO.isBiodermaGame })
                    .getMany();
                return response;
            }
            catch (err) {
                console.log("CampaingService - findTopCampaing: ", err);
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Error getting campaings',
                }, 500);
            }
        });
    }
    create(createDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let newCampaing = this.campaingRepository.create({
                    name: createDTO.name,
                    portrait: createDTO.portrait,
                    isActive: true,
                    isDeleted: false,
                    isBiodermaGame: createDTO.isBiodermaGame
                });
                const campaingTargets = yield this.targetRepository.findByIds(createDTO.targets);
                newCampaing.target = campaingTargets;
                yield this.campaingRepository.save(newCampaing);
                return { status: 0 };
            }
            catch (err) {
                console.log("CampaingService - create: ", err);
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Error creating campaing',
                }, 500);
            }
        });
    }
};
CampaingService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(campaing_entity_1.Campaing)),
    __param(1, typeorm_1.InjectRepository(target_entity_1.Target)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], CampaingService);
exports.CampaingService = CampaingService;
//# sourceMappingURL=campaing.service.js.map
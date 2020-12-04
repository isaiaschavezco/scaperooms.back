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
const clinic_entity_1 = require("./clinic.entity");
let ClinicService = class ClinicService {
    constructor(clinicRepository) {
        this.clinicRepository = clinicRepository;
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const clinicList = yield this.clinicRepository.find({
                    where: { isDeleted: false },
                    order: {
                        name: "ASC"
                    }
                });
                return { clinics: clinicList };
            }
            catch (err) {
                console.log("ClinicService - findAll: ", err);
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Error getting clinics',
                }, 500);
            }
        });
    }
    create(createDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let status = 0;
                let clinic = yield this.clinicRepository.findOne({ where: { name: createDTO.name, isDeleted: false } });
                if (clinic) {
                    status = 2;
                }
                else {
                    let newClinic = this.clinicRepository.create({
                        name: createDTO.name,
                        isDeleted: createDTO.isDeleted
                    });
                    yield this.clinicRepository.save(newClinic);
                    status = 1;
                }
                return status;
            }
            catch (err) {
                console.log("ClinicService - create: ", err);
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Error verifying token',
                }, 500);
            }
        });
    }
    delete(clinicId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let clinicToUpdate = yield this.clinicRepository.findOne(clinicId);
                clinicToUpdate.isDeleted = true;
                yield this.clinicRepository.save(clinicToUpdate);
                return 1;
            }
            catch (err) {
                console.log("ClinicService - delete: ", err);
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Error verifying token',
                }, 500);
            }
        });
    }
};
ClinicService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(clinic_entity_1.Clinic)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ClinicService);
exports.ClinicService = ClinicService;
//# sourceMappingURL=clinic.service.js.map
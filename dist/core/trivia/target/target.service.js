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
const target_entity_1 = require("./target.entity");
const city_entity_1 = require("../../users/city/city.entity");
const delegation_entity_1 = require("../../users/delegation/delegation.entity");
const chain_entity_1 = require("../../users/chain/chain.entity");
const type_entity_1 = require("../../users/type/type.entity");
const position_entity_1 = require("../../users/position/position.entity");
const role_entity_1 = require("../../users/role/role.entity");
const clinic_entity_1 = require("./../../users/clinic/clinic.entity");
let TargetService = class TargetService {
    constructor(targetRepository, cityRepository, chainRepository, clinicRepository, typeRepository, positionRepository, roleRepository, delegationRepository) {
        this.targetRepository = targetRepository;
        this.cityRepository = cityRepository;
        this.chainRepository = chainRepository;
        this.clinicRepository = clinicRepository;
        this.typeRepository = typeRepository;
        this.positionRepository = positionRepository;
        this.roleRepository = roleRepository;
        this.delegationRepository = delegationRepository;
    }
    findAllTargets() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const targetslist = yield this.targetRepository.find();
                return targetslist;
            }
            catch (err) {
                console.log("TargetService - findAll: ", err);
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Error getting targets',
                }, 500);
            }
        });
    }
    create(createDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let stateTargetData = null;
                if (createDTO.state !== -1) {
                    stateTargetData = yield this.cityRepository.findOne(createDTO.state);
                }
                let cityTargetData = null;
                if (createDTO.city !== -1) {
                    cityTargetData = yield this.delegationRepository.findOne(createDTO.city);
                }
                let chainTargetData = null;
                if (createDTO.chain !== -1) {
                    chainTargetData = yield this.chainRepository.findOne(createDTO.chain);
                }
                let clinicTargetData = null;
                if (createDTO.clinic !== -1) {
                    clinicTargetData = yield this.clinicRepository.findOne(createDTO.clinic);
                }
                let userTypeTargetData = null;
                let userIsAdmin = null;
                if (createDTO.userType !== -1) {
                    if (createDTO.userType == 3) {
                        userIsAdmin = yield this.roleRepository.findOne(1);
                    }
                    else if (createDTO.userType == 4) {
                        userTypeTargetData = yield this.typeRepository.findOne(3);
                    }
                    else {
                        userTypeTargetData = yield this.typeRepository.findOne(createDTO.userType);
                    }
                }
                let naosPositionTargetData = null;
                if (createDTO.naosPosition !== -1) {
                    naosPositionTargetData = yield this.positionRepository.findOne(createDTO.naosPosition);
                }
                let genderTargetData = null;
                if (createDTO.gender !== -1) {
                    genderTargetData = createDTO.gender === 0 ? false : true;
                }
                let newTarget = this.targetRepository.create({
                    allUsers: createDTO.allUsers,
                    initAge: createDTO.initAge !== -1 ? createDTO.initAge : null,
                    finalAge: createDTO.finalAge !== -1 ? createDTO.finalAge : null,
                    gender: genderTargetData,
                    city: stateTargetData,
                    delegation: cityTargetData,
                    chain: chainTargetData,
                    clinic: clinicTargetData,
                    position: naosPositionTargetData,
                    type: userTypeTargetData,
                    role: userIsAdmin
                });
                const targetCreated = yield this.targetRepository.save(newTarget);
                return {
                    target: {
                        id: targetCreated.id,
                        initAge: targetCreated.initAge,
                        finalAge: targetCreated.finalAge,
                        gender: targetCreated.gender,
                        city: targetCreated.city ? targetCreated.city.name : null,
                        delegation: targetCreated.delegation ? targetCreated.delegation.name : null,
                        chain: targetCreated.chain ? targetCreated.chain.name : null,
                        clinic: targetCreated.clinic ? targetCreated.clinic.name : null,
                        position: targetCreated.position ? targetCreated.position.name : null,
                        type: targetCreated.type ? targetCreated.type.name : null,
                        allUsers: targetCreated.allUsers,
                        role: targetCreated.role ? targetCreated.role.name : null
                    }
                };
            }
            catch (err) {
                console.log("TargetService - create: ", err);
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Error creating target',
                }, 500);
            }
        });
    }
    delete(deleteDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const targetToDelete = yield this.targetRepository.findOne(deleteDTO.targetId);
                yield this.targetRepository.remove(targetToDelete);
                return { status: 0 };
            }
            catch (err) {
                console.log("TargetService - create: ", err);
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Error creating target',
                }, 500);
            }
        });
    }
};
TargetService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(target_entity_1.Target)),
    __param(1, typeorm_1.InjectRepository(city_entity_1.City)),
    __param(2, typeorm_1.InjectRepository(chain_entity_1.Chain)),
    __param(3, typeorm_1.InjectRepository(clinic_entity_1.Clinic)),
    __param(4, typeorm_1.InjectRepository(type_entity_1.Type)),
    __param(5, typeorm_1.InjectRepository(position_entity_1.Position)),
    __param(6, typeorm_1.InjectRepository(role_entity_1.Role)),
    __param(7, typeorm_1.InjectRepository(delegation_entity_1.Delegation)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], TargetService);
exports.TargetService = TargetService;
//# sourceMappingURL=target.service.js.map
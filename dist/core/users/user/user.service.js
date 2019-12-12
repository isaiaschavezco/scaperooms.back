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
const user_entity_1 = require("./user.entity");
const token_entity_1 = require("../token/token.entity");
const type_entity_1 = require("../type/type.entity");
const chain_entity_1 = require("../chain/chain.entity");
const city_entity_1 = require("../city/city.entity");
const delegation_entity_1 = require("../delegation/delegation.entity");
const position_entity_1 = require("../position/position.entity");
const mailer_1 = require("@nest-modules/mailer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const moment = require("moment");
let UserService = class UserService {
    constructor(userRepository, mailerService, tokenRepository, typeRepository, chainRepository, positionRepository, stateRepository, cityRepository) {
        this.userRepository = userRepository;
        this.mailerService = mailerService;
        this.tokenRepository = tokenRepository;
        this.typeRepository = typeRepository;
        this.chainRepository = chainRepository;
        this.positionRepository = positionRepository;
        this.stateRepository = stateRepository;
        this.cityRepository = cityRepository;
    }
    invite(request) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let status = 0;
                const token = yield this.tokenRepository.findOne({
                    where: { email: request.email }
                });
                if (token) {
                    yield this.tokenRepository.remove(token);
                }
                const userType = yield this.typeRepository.findOne(request.type);
                let newToken = this.tokenRepository.create({
                    email: request.email,
                    type: userType
                });
                const registerToken = yield this.tokenRepository.save(newToken);
                const jwtToken = yield jwt.sign({ token: registerToken.id }, "Bi0d3rmaTokenJWT.");
                yield this.mailerService.sendMail({
                    to: request.email,
                    subject: 'Has sido invitado a Bioderma.',
                    template: 'invitacion',
                    context: {
                        url: jwtToken,
                        type: request.type
                    },
                });
                return status;
            }
            catch (err) {
                console.log("UserService - invite: ", err);
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Error invitins user',
                }, 500);
            }
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const usersList = yield this.userRepository.find();
                return usersList;
            }
            catch (err) {
                console.log("UserService - findAll: ", err);
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Error getting users',
                }, 500);
            }
        });
    }
    findUserDetail(requestEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userRepository.findOne({
                    relations: ["type", "chain", "city", "delegation", "position"],
                    where: { email: requestEmail }
                });
                return {
                    profile: {
                        id: user.id,
                        name: user.name,
                        lastName: user.lastName,
                        nickname: user.nickname,
                        gender: user.gender,
                        image: user.photo,
                        birthday: moment(new Date(user.birthDate)).format('DD-MM-YYYY'),
                        phonenumber: user.phone,
                        email: user.email,
                        type: user.type.id,
                        totalPoints: user.points,
                        address: {
                            state: user.city,
                            city: user.delegation,
                            mayoralty: user.mayoralty,
                            suburb: user.town
                        },
                        workPosition: user.position,
                        branchChain: user.chain,
                        branchOffice: user.drugstore,
                        postalCode: user.postalCode,
                        charge: user.charge
                    }
                };
            }
            catch (err) {
                console.log("UserService - findUserDetail: ", err);
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Error getting user',
                }, 500);
            }
        });
    }
    create(createUserDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userPassword = yield bcrypt.hash(createUserDTO.password, 12);
                const userAge = this.getAge(createUserDTO.birthDate);
                const userChain = yield this.chainRepository.findOne(createUserDTO.chain);
                let newUser = yield this.userRepository.create({
                    name: createUserDTO.name,
                    lastName: createUserDTO.lastName,
                    photo: createUserDTO.photo,
                    nickname: createUserDTO.nickname,
                    birthDate: createUserDTO.birthDate,
                    gender: createUserDTO.gender,
                    phone: createUserDTO.phone,
                    email: createUserDTO.email,
                    drugstore: createUserDTO.drugStore,
                    postalCode: createUserDTO.drugStore,
                    password: userPassword,
                    chain: userChain,
                    isActive: true,
                    points: 0,
                    age: userAge
                });
                yield this.userRepository.save(newUser);
                return { status: 0 };
            }
            catch (err) {
                console.log("UserService - create: ", err);
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Error getting users',
                }, 500);
            }
        });
    }
    createNAOS(createNAOSUserDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let response = null;
                const userExist = yield this.userRepository.findOne({
                    where: { email: createNAOSUserDTO.email }
                });
                if (userExist) {
                    response = { status: 5 };
                }
                else {
                    const userPassword = yield bcrypt.hash(createNAOSUserDTO.password, 12);
                    const userAge = this.getAge(createNAOSUserDTO.birthDate);
                    const naosPosition = yield this.positionRepository.findOne(createNAOSUserDTO.naosPosition);
                    const userState = yield this.stateRepository.findOne(createNAOSUserDTO.state);
                    const userCity = yield this.cityRepository.findOne(createNAOSUserDTO.city);
                    const userType = yield this.typeRepository.findOne(1);
                    let newUser = yield this.userRepository.create({
                        name: createNAOSUserDTO.name,
                        lastName: createNAOSUserDTO.lastName,
                        photo: createNAOSUserDTO.photo,
                        birthDate: createNAOSUserDTO.birthDate,
                        gender: createNAOSUserDTO.gender,
                        phone: createNAOSUserDTO.phone,
                        email: createNAOSUserDTO.email,
                        nickname: createNAOSUserDTO.nickName,
                        password: userPassword,
                        position: naosPosition,
                        isActive: true,
                        city: userState,
                        delegation: userCity,
                        points: 0,
                        age: userAge,
                        type: userType
                    });
                    yield this.userRepository.save(newUser);
                    response = { status: 0 };
                }
                return response;
            }
            catch (err) {
                console.log("UserService - createNAOS: ", err);
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Error creating NAOS user',
                }, 500);
            }
        });
    }
    createDrugStore(createDrugStoreUserDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let response = null;
                const userExist = yield this.userRepository.findOne({
                    where: { email: createDrugStoreUserDTO.email }
                });
                if (userExist) {
                    response = { status: 5 };
                }
                else {
                    const userPassword = yield bcrypt.hash(createDrugStoreUserDTO.password, 12);
                    const userAge = this.getAge(createDrugStoreUserDTO.birthDate);
                    const userState = yield this.stateRepository.findOne(createDrugStoreUserDTO.state);
                    const userCity = yield this.cityRepository.findOne(createDrugStoreUserDTO.city);
                    const userType = yield this.typeRepository.findOne(2);
                    const userChain = yield this.chainRepository.findOne(createDrugStoreUserDTO.chain);
                    let newUser = yield this.userRepository.create({
                        name: createDrugStoreUserDTO.name,
                        lastName: createDrugStoreUserDTO.lastName,
                        nickname: createDrugStoreUserDTO.nickName,
                        photo: createDrugStoreUserDTO.photo,
                        birthDate: createDrugStoreUserDTO.birthDate,
                        gender: createDrugStoreUserDTO.gender,
                        phone: createDrugStoreUserDTO.phone,
                        email: createDrugStoreUserDTO.email,
                        postalCode: createDrugStoreUserDTO.postalCode,
                        drugstore: createDrugStoreUserDTO.drugStore,
                        password: userPassword,
                        chain: userChain,
                        isActive: true,
                        city: userState,
                        delegation: userCity,
                        points: 0,
                        age: userAge,
                        type: userType,
                        town: createDrugStoreUserDTO.town,
                        charge: createDrugStoreUserDTO.charge,
                        mayoralty: createDrugStoreUserDTO.mayoralty
                    });
                    yield this.userRepository.save(newUser);
                    response = { status: 0 };
                }
                return response;
            }
            catch (err) {
                console.log("UserService - createDrugStore: ", err);
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Error creating Drugstore user',
                }, 500);
            }
        });
    }
    getAge(dateString) {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && (today.getDate() < birthDate.getDate()))) {
            age--;
        }
        return age;
    }
    updateNAOS(updateNAOSUserDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let response = null;
                const userExist = yield this.userRepository.findOne({
                    relations: ["city", "delegation", "position"],
                    where: { email: updateNAOSUserDTO.userId }
                });
                if (!userExist) {
                    response = { status: 1 };
                }
                else {
                    if (updateNAOSUserDTO.name) {
                        userExist.name = updateNAOSUserDTO.name;
                    }
                    if (updateNAOSUserDTO.lastName) {
                        userExist.lastName = updateNAOSUserDTO.lastName;
                    }
                    if (updateNAOSUserDTO.photo) {
                        userExist.photo = updateNAOSUserDTO.photo;
                    }
                    if (updateNAOSUserDTO.nickName) {
                        userExist.nickname = updateNAOSUserDTO.nickName;
                    }
                    if (updateNAOSUserDTO.birthDate) {
                        userExist.birthDate = new Date(updateNAOSUserDTO.birthDate);
                        const userAge = this.getAge(updateNAOSUserDTO.birthDate);
                        userExist.age = userAge;
                    }
                    if (updateNAOSUserDTO.gender) {
                        userExist.gender = updateNAOSUserDTO.gender;
                    }
                    if (updateNAOSUserDTO.phone) {
                        userExist.phone = updateNAOSUserDTO.phone;
                    }
                    if (updateNAOSUserDTO.naosPosition) {
                        const naosPosition = yield this.positionRepository.findOne(updateNAOSUserDTO.naosPosition);
                        userExist.position = naosPosition;
                    }
                    if (updateNAOSUserDTO.state) {
                        const userState = yield this.stateRepository.findOne(updateNAOSUserDTO.state);
                        userExist.city = userState;
                    }
                    if (updateNAOSUserDTO.city) {
                        const userCity = yield this.cityRepository.findOne(updateNAOSUserDTO.city);
                        userExist.delegation = userCity;
                    }
                    userExist.isActive = true;
                    const registeredUser = yield this.userRepository.save(userExist);
                    response = { user: registeredUser };
                }
                return response;
            }
            catch (err) {
                console.log("UserService - updateNAOS: ", err);
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Error updating NAOS user',
                }, 500);
            }
        });
    }
    updateDrugStore(updateDrugStoreUserDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let response = null;
                const userExist = yield this.userRepository.findOne({
                    relations: ["city", "delegation", "chain"],
                    where: { email: updateDrugStoreUserDTO.userId }
                });
                if (!userExist) {
                    response = { status: 1 };
                }
                else {
                    if (updateDrugStoreUserDTO.name) {
                        userExist.name = updateDrugStoreUserDTO.name;
                    }
                    if (updateDrugStoreUserDTO.lastName) {
                        userExist.lastName = updateDrugStoreUserDTO.lastName;
                    }
                    if (updateDrugStoreUserDTO.photo) {
                        userExist.photo = updateDrugStoreUserDTO.photo;
                    }
                    if (updateDrugStoreUserDTO.nickName) {
                        userExist.nickname = updateDrugStoreUserDTO.nickName;
                    }
                    if (updateDrugStoreUserDTO.birthDate) {
                        const userAge = this.getAge(updateDrugStoreUserDTO.birthDate);
                        userExist.birthDate = new Date(updateDrugStoreUserDTO.birthDate);
                        userExist.age = userAge;
                    }
                    if (updateDrugStoreUserDTO.gender) {
                        userExist.gender = updateDrugStoreUserDTO.gender;
                    }
                    if (updateDrugStoreUserDTO.phone) {
                        userExist.phone = updateDrugStoreUserDTO.phone;
                    }
                    if (updateDrugStoreUserDTO.postalCode) {
                        userExist.postalCode = updateDrugStoreUserDTO.postalCode;
                    }
                    if (updateDrugStoreUserDTO.chain) {
                        const userChain = yield this.chainRepository.findOne(updateDrugStoreUserDTO.chain);
                        userExist.chain = userChain;
                    }
                    if (updateDrugStoreUserDTO.state) {
                        const userState = yield this.stateRepository.findOne(updateDrugStoreUserDTO.state);
                        userExist.city = userState;
                    }
                    if (updateDrugStoreUserDTO.city) {
                        const userCity = yield this.cityRepository.findOne(updateDrugStoreUserDTO.city);
                        userExist.delegation = userCity;
                    }
                    if (updateDrugStoreUserDTO.drugStore) {
                        userExist.drugstore = updateDrugStoreUserDTO.drugStore;
                    }
                    if (updateDrugStoreUserDTO.town) {
                        userExist.town = updateDrugStoreUserDTO.town;
                    }
                    if (updateDrugStoreUserDTO.charge) {
                        userExist.charge = updateDrugStoreUserDTO.charge;
                    }
                    if (updateDrugStoreUserDTO.mayoralty) {
                        userExist.mayoralty = updateDrugStoreUserDTO.mayoralty;
                    }
                    userExist.isActive = true;
                    yield this.userRepository.save(userExist);
                    response = { user: userExist };
                }
                return response;
            }
            catch (err) {
                console.log("UserService - updateDrugStore: ", err);
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Error updating Drugstore user',
                }, 500);
            }
        });
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(user_entity_1.User)),
    __param(2, typeorm_1.InjectRepository(token_entity_1.Token)),
    __param(3, typeorm_1.InjectRepository(type_entity_1.Type)),
    __param(4, typeorm_1.InjectRepository(chain_entity_1.Chain)),
    __param(5, typeorm_1.InjectRepository(position_entity_1.Position)),
    __param(6, typeorm_1.InjectRepository(city_entity_1.City)),
    __param(7, typeorm_1.InjectRepository(delegation_entity_1.Delegation)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        mailer_1.MailerService,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map
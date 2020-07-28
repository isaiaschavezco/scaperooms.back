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
const role_entity_1 = require("../role/role.entity");
const quizz_entity_1 = require("../../trivia/quizz/quizz.entity");
const target_entity_1 = require("../../trivia/target/target.entity");
const campaing_entity_1 = require("../../trivia/campaing/campaing.entity");
const sesion_entity_1 = require("../sesion/sesion.entity");
const configuration_entity_1 = require("../configuration/configuration.entity");
const mailer_1 = require("@nestjs-modules/mailer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const moment = require("moment");
let UserService = class UserService {
    constructor(userRepository, mailerService, campaingRepository, quizzRepository, targetRepository, tokenRepository, typeRepository, chainRepository, positionRepository, stateRepository, cityRepository, roleRepository, sesionRepository, configurationRepository) {
        this.userRepository = userRepository;
        this.mailerService = mailerService;
        this.campaingRepository = campaingRepository;
        this.quizzRepository = quizzRepository;
        this.targetRepository = targetRepository;
        this.tokenRepository = tokenRepository;
        this.typeRepository = typeRepository;
        this.chainRepository = chainRepository;
        this.positionRepository = positionRepository;
        this.stateRepository = stateRepository;
        this.cityRepository = cityRepository;
        this.roleRepository = roleRepository;
        this.sesionRepository = sesionRepository;
        this.configurationRepository = configurationRepository;
    }
    invite(request) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let status = 0;
                let tokenToSign = '';
                let userExist = yield this.userRepository.findOne({
                    where: { email: request.email }
                });
                if (!userExist) {
                    const token = yield this.tokenRepository.findOne({
                        where: { email: request.email }
                    });
                    if (!token) {
                        const userType = yield this.typeRepository.findOne(request.type);
                        let newToken = this.tokenRepository.create({
                            email: request.email,
                            type: userType
                        });
                        const registerToken = yield this.tokenRepository.save(newToken);
                        tokenToSign = registerToken.id;
                    }
                    else {
                        tokenToSign = token.id;
                    }
                    const jwtToken = yield jwt.sign({ token: tokenToSign }, "Bi0d3rmaTokenJWT.");
                    yield this.mailerService.sendMail({
                        to: request.email,
                        subject: 'Has sido invitado a Bioderma.',
                        template: 'invitacion',
                        context: {
                            url: jwtToken,
                            type: request.type,
                            email: request.email
                        },
                    });
                }
                else {
                    if (userExist.isActive) {
                        status = 9;
                    }
                    else {
                        status = 8;
                        userExist.isActive = true;
                        yield this.userRepository.save(userExist);
                    }
                }
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
                const usersList = yield this.userRepository.find({
                    select: ["id", "name", "email", "points"],
                    relations: ["position", "type", "chain"],
                    where: { isActive: true }
                });
                return { users: usersList };
            }
            catch (err) {
                console.log("UserService - findAll: ", err);
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Error getting users list',
                }, 500);
            }
        });
    }
    confirmPassword(requestDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let response = { status: 0 };
                const userExist = yield this.userRepository.findOne({
                    where: { email: requestDTO.email },
                    select: ["id", "name", "email", "points", "password"]
                });
                if (userExist) {
                    const match = yield bcrypt.compare(requestDTO.password, userExist.password);
                    if (!match) {
                        response = { status: 2 };
                    }
                }
                else {
                    response = { status: 1 };
                }
                return response;
            }
            catch (err) {
                console.log("UserService - confirmPassword: ", err);
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Error confirming user password',
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
                        charge: user.charge,
                        biodermaGamePoints: user.biodermaGamePoints
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
                let response = { status: 0 };
                const userExist = yield this.userRepository.findOne({
                    where: { email: createNAOSUserDTO.email }
                });
                if (userExist) {
                    response = { status: 5 };
                }
                else {
                    const jwtDecoded = yield jwt.verify(createNAOSUserDTO.userToken, "Bi0d3rmaTokenJWT.");
                    const tokenExist = yield this.tokenRepository.findOne(jwtDecoded.token);
                    response = { status: 13 };
                    if (tokenExist) {
                        if (tokenExist.email.trim() == createNAOSUserDTO.email.trim() || tokenExist.email.trim() == 'naos@general.com') {
                            const userPassword = yield bcrypt.hash(createNAOSUserDTO.password, 12);
                            const userAge = this.getAge(createNAOSUserDTO.birthDate);
                            const naosPosition = yield this.positionRepository.findOne(createNAOSUserDTO.naosPosition);
                            const userState = yield this.stateRepository.findOne(createNAOSUserDTO.state);
                            const userCity = yield this.cityRepository.findOne(createNAOSUserDTO.city);
                            const userType = yield this.typeRepository.findOne(1);
                            const userRole = yield this.roleRepository.findOne(2);
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
                                biodermaGamePoints: 0,
                                age: isNaN(userAge) ? 0 : userAge,
                                type: userType,
                                role: userRole
                            });
                            const targetsToFilter = yield this.targetRepository.find({
                                relations: ["city", "chain", "position", "type", "role", "delegation"],
                                where: [{ type: userType, role: null }, { allUsers: true, role: null }]
                            });
                            let filteredTargets = [];
                            for (let index = 0; index < targetsToFilter.length; index++) {
                                const tempTarget = targetsToFilter[index];
                                const ageFilter = (tempTarget.initAge <= userAge && userAge <= tempTarget.finalAge) || (tempTarget.initAge == null && tempTarget.finalAge == null);
                                const genderFilter = (tempTarget.gender == createNAOSUserDTO.gender) || (tempTarget.gender == null);
                                const cityFilter = tempTarget.city == null ? true : (tempTarget.city.id == userState.id);
                                const delegationFilter = tempTarget.delegation == null ? true : (tempTarget.delegation.id == userCity.id);
                                const chainFilter = tempTarget.chain == null;
                                const positionFilter = tempTarget.position == null ? true : (tempTarget.position.id == naosPosition.id);
                                if (ageFilter && genderFilter && cityFilter && chainFilter && positionFilter && delegationFilter) {
                                    filteredTargets.push(tempTarget.id);
                                }
                            }
                            const quizzesFilteredByTarget = yield this.campaingRepository.createQueryBuilder("cmp")
                                .select("qz.id", "id")
                                .innerJoin("cmp.target", "tg")
                                .leftJoin("cmp.quizz", "qz")
                                .where("tg.id IN (:...targetsIds) AND qz.isSend = true", { targetsIds: filteredTargets })
                                .getRawMany();
                            newUser.quizz = quizzesFilteredByTarget;
                            yield this.userRepository.save(newUser);
                            if (tokenExist.email.trim() != 'naos@general.com') {
                                yield this.tokenRepository.remove(tokenExist);
                            }
                            response = { status: 0 };
                        }
                    }
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
                    const jwtDecoded = yield jwt.verify(createDrugStoreUserDTO.userToken, "Bi0d3rmaTokenJWT.");
                    const tokenExist = yield this.tokenRepository.findOne(jwtDecoded.token);
                    response = { status: 13 };
                    if (tokenExist) {
                        if (tokenExist.email.trim() == createDrugStoreUserDTO.email.trim() || tokenExist.email.trim() == 'drugstore@general.com') {
                            const userPassword = yield bcrypt.hash(createDrugStoreUserDTO.password, 12);
                            const userAge = this.getAge(createDrugStoreUserDTO.birthDate);
                            const userState = yield this.stateRepository.findOne(createDrugStoreUserDTO.state);
                            const userCity = yield this.cityRepository.findOne(createDrugStoreUserDTO.city);
                            const userType = yield this.typeRepository.findOne(2);
                            const userChain = yield this.chainRepository.findOne(createDrugStoreUserDTO.chain);
                            const userRole = yield this.roleRepository.findOne(2);
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
                                biodermaGamePoints: 0,
                                age: isNaN(userAge) ? 0 : userAge,
                                type: userType,
                                town: createDrugStoreUserDTO.town,
                                charge: createDrugStoreUserDTO.charge,
                                mayoralty: createDrugStoreUserDTO.mayoralty,
                                role: userRole
                            });
                            const targetsToFilter = yield this.targetRepository.find({
                                relations: ["city", "chain", "position", "type", "role", "delegation"],
                                where: [{ type: userType, role: null }, { allUsers: true, role: null }]
                            });
                            let filteredTargets = [];
                            for (let index = 0; index < targetsToFilter.length; index++) {
                                const tempTarget = targetsToFilter[index];
                                const ageFilter = (tempTarget.initAge <= userAge && userAge <= tempTarget.finalAge) || (tempTarget.initAge == null && tempTarget.finalAge == null);
                                const genderFilter = (tempTarget.gender == createDrugStoreUserDTO.gender) || (tempTarget.gender == null);
                                const cityFilter = tempTarget.city == null ? true : (tempTarget.city.id == userState.id);
                                const delegationFilter = tempTarget.delegation == null ? true : (tempTarget.delegation.id == userCity.id);
                                const chainFilter = tempTarget.chain == null ? true : (tempTarget.chain.id == userChain.id);
                                const positionFilter = tempTarget.position == null;
                                if (ageFilter && genderFilter && cityFilter && chainFilter && positionFilter && delegationFilter) {
                                    filteredTargets.push(tempTarget.id);
                                }
                            }
                            const quizzesFilteredByTarget = yield this.campaingRepository.createQueryBuilder("cmp")
                                .select("qz.id", "id")
                                .innerJoin("cmp.target", "tg")
                                .leftJoin("cmp.quizz", "qz")
                                .where("tg.id IN (:...targetsIds) AND qz.isSend = true", { targetsIds: filteredTargets })
                                .getRawMany();
                            newUser.quizz = quizzesFilteredByTarget;
                            yield this.userRepository.save(newUser);
                            if (tokenExist.email.trim() != 'drugstore@general.com') {
                                yield this.tokenRepository.remove(tokenExist);
                            }
                            response = { status: 0 };
                        }
                    }
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
                let userExist = yield this.userRepository.findOne({
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
                    if (updateNAOSUserDTO.nickname) {
                        userExist.nickname = updateNAOSUserDTO.nickname;
                    }
                    if (updateNAOSUserDTO.birthDate) {
                        userExist.birthDate = new Date(updateNAOSUserDTO.birthDate);
                        const userAge = this.getAge(updateNAOSUserDTO.birthDate);
                        userExist.age = isNaN(userAge) ? 0 : userAge;
                    }
                    if (typeof updateNAOSUserDTO.gender !== "undefined") {
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
                    yield this.userRepository.save(userExist);
                    const userToReturn = yield this.userRepository.findOne({
                        relations: ["type", "chain", "city", "delegation", "position", "notificacion"],
                        where: { email: userExist.email }
                    });
                    const loggedUser = yield this.sesionRepository.findOne({
                        where: { user: userToReturn }
                    });
                    const generalConfiguration = yield this.configurationRepository.findOne(1);
                    response = {
                        user: {
                            token: loggedUser.id,
                            name: userToReturn.name,
                            lastName: userToReturn.lastName,
                            nickname: userToReturn.nickname,
                            gender: userToReturn.gender,
                            image: userToReturn.photo,
                            birthday: moment(new Date(userToReturn.birthDate)).format('DD-MM-YYYY'),
                            phonenumber: userToReturn.phone,
                            email: userToReturn.email,
                            type: userToReturn.type.id,
                            totalPoints: userToReturn.points,
                            address: {
                                state: userToReturn.city,
                                city: userToReturn.delegation,
                                mayoralty: userToReturn.mayoralty,
                                suburb: userToReturn.town
                            },
                            workPosition: userToReturn.position,
                            statusCart: generalConfiguration.isClubBiodermaActive,
                            branchChain: userToReturn.chain,
                            branchOffice: userToReturn.drugstore,
                            postalCode: userToReturn.postalCode,
                            charge: userToReturn.charge,
                            isActiveCart: userToReturn.type.id === 1 ? false : true,
                            countNotifications: userToReturn.notificacion ? userToReturn.notificacion.length : 0,
                            totalBiodermaGames: userToReturn.biodermaGamePoints ? userToReturn.biodermaGamePoints : 0
                        }
                    };
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
                let userExist = yield this.userRepository.findOne({
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
                    if (updateDrugStoreUserDTO.nickname) {
                        userExist.nickname = updateDrugStoreUserDTO.nickname;
                    }
                    if (updateDrugStoreUserDTO.birthDate) {
                        const userAge = this.getAge(updateDrugStoreUserDTO.birthDate);
                        userExist.birthDate = new Date(updateDrugStoreUserDTO.birthDate);
                        userExist.age = isNaN(userAge) ? 0 : userAge;
                    }
                    if (typeof updateDrugStoreUserDTO.gender !== "undefined") {
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
                    const userToReturn = yield this.userRepository.findOne({
                        relations: ["type", "chain", "city", "delegation", "position", "notificacion"],
                        where: { email: userExist.email }
                    });
                    const loggedUser = yield this.sesionRepository.findOne({
                        where: { user: userToReturn }
                    });
                    const generalConfiguration = yield this.configurationRepository.findOne(1);
                    response = {
                        user: {
                            token: loggedUser.id,
                            name: userToReturn.name,
                            lastName: userToReturn.lastName,
                            nickname: userToReturn.nickname,
                            gender: userToReturn.gender,
                            image: userToReturn.photo,
                            birthday: moment(new Date(userToReturn.birthDate)).format('DD-MM-YYYY'),
                            phonenumber: userToReturn.phone,
                            email: userToReturn.email,
                            type: userToReturn.type.id,
                            totalPoints: userToReturn.points,
                            address: {
                                state: userToReturn.city,
                                city: userToReturn.delegation,
                                mayoralty: userToReturn.mayoralty,
                                suburb: userToReturn.town
                            },
                            workPosition: userToReturn.position,
                            statusCart: generalConfiguration.isClubBiodermaActive,
                            branchChain: userToReturn.chain,
                            branchOffice: userToReturn.drugstore,
                            postalCode: userToReturn.postalCode,
                            charge: userToReturn.charge,
                            isActiveCart: userToReturn.type.id === 1 ? false : true,
                            countNotifications: userToReturn.notificacion ? userToReturn.notificacion.length : 0,
                            totalBiodermaGames: userToReturn.biodermaGamePoints ? userToReturn.biodermaGamePoints : 0
                        }
                    };
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
    deleteUser(requestEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let userToDelete = yield this.userRepository.findOne({
                    where: { email: requestEmail }
                });
                userToDelete.isActive = false;
                yield this.userRepository.save(userToDelete);
                return { status: 0 };
            }
            catch (err) {
                console.log("UserService - deleteUser: ", err);
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Error deleting user',
                }, 500);
            }
        });
    }
    resetUserPoints() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let usersToReset = yield this.userRepository.find({
                    where: { isActive: true }
                });
                usersToReset.forEach(tempUser => {
                    tempUser.points = 0;
                    tempUser.biodermaGamePoints = 0;
                });
                yield this.userRepository.save(usersToReset);
                return { status: 0 };
            }
            catch (err) {
                console.log("UserService - resetUserPoints: ", err);
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Error resetting user points',
                }, 500);
            }
        });
    }
    requestPasswordReset(requestEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let response = { status: 0 };
                const user = yield this.userRepository.findOne({
                    where: { email: requestEmail }
                });
                if (user) {
                    let newToken = this.tokenRepository.create({
                        email: requestEmail
                    });
                    const registerToken = yield this.tokenRepository.save(newToken);
                    const jwtToken = yield jwt.sign({ token: registerToken.id }, "Bi0d3rmaTokenJWT.");
                    yield this.mailerService.sendMail({
                        to: requestEmail,
                        subject: 'Recuperacion de contraseña.',
                        template: 'recovery',
                        context: {
                            url: jwtToken,
                            email: requestEmail
                        },
                    });
                }
                else {
                    response = { status: 1 };
                }
                return response;
            }
            catch (err) {
                console.log("UserService - requestPasswordReset: ", err);
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Error requesting password reset',
                }, 500);
            }
        });
    }
    getUserPoints(requestEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userRepository.findOne({
                    where: { email: requestEmail }
                });
                return {
                    points: {
                        totalPoints: user.points,
                        biodermaGamePoints: user.biodermaGamePoints
                    }
                };
            }
            catch (err) {
                console.log("UserService - getUserPoints: ", err);
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Error getting user points',
                }, 500);
            }
        });
    }
    passwordRecovery(requestDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let response = { status: 0 };
                const jwtDecoded = yield jwt.verify(requestDTO.token, "Bi0d3rmaTokenJWT.");
                if (!jwtDecoded.token) {
                    response = { status: 10 };
                }
                else {
                    const tokenExist = yield this.tokenRepository.findOne(jwtDecoded.token);
                    if (tokenExist) {
                        const passwordHashed = yield bcrypt.hash(requestDTO.password, 12);
                        let userToUpdate = yield this.userRepository.findOne({
                            where: { email: requestDTO.email }
                        });
                        userToUpdate.password = passwordHashed;
                        yield this.userRepository.save(userToUpdate);
                        yield this.tokenRepository.remove(tokenExist);
                    }
                    else {
                        response = { status: 10 };
                    }
                }
                return response;
            }
            catch (err) {
                console.log("UserService - passwordRecovery: ", err);
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Error ressetign password',
                }, 500);
            }
        });
    }
    generateReport(userType) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const report = yield this.userRepository.createQueryBuilder("user")
                    .select("user.name", "NOMBRE")
                    .addSelect("user.lastName", "APELLIDO")
                    .addSelect("user.email", "EMAIL")
                    .addSelect("type.name", "TIPO")
                    .addSelect("chain.name", "CADENA")
                    .addSelect("user.drugstore", "SUCURSAL")
                    .addSelect("city.name", "ESTADO")
                    .addSelect("pobyus.points", "PUNTOS")
                    .addSelect("quizz.name", "TRIVIA")
                    .addSelect("camp.name", "CAMAPANA")
                    .innerJoin("user.quizz", "quizz")
                    .innerJoin("quizz.campaing", "camp")
                    .innerJoin("user.type", "type")
                    .innerJoin("user.city", "city")
                    .leftJoin("user.chain", "chain")
                    .leftJoin("user.pointsbyuser", "pobyus", "pobyus.quizz = quizz.id")
                    .where("user.type = :userType AND user.isActive = true", { userType: parseInt(userType) })
                    .orderBy("user.email", "ASC")
                    .getRawMany();
                return { report };
            }
            catch (err) {
                console.log("UserService - generateReport: ", err);
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Error generating report',
                }, 500);
            }
        });
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(user_entity_1.User)),
    __param(2, typeorm_1.InjectRepository(campaing_entity_1.Campaing)),
    __param(3, typeorm_1.InjectRepository(quizz_entity_1.Quizz)),
    __param(4, typeorm_1.InjectRepository(target_entity_1.Target)),
    __param(5, typeorm_1.InjectRepository(token_entity_1.Token)),
    __param(6, typeorm_1.InjectRepository(type_entity_1.Type)),
    __param(7, typeorm_1.InjectRepository(chain_entity_1.Chain)),
    __param(8, typeorm_1.InjectRepository(position_entity_1.Position)),
    __param(9, typeorm_1.InjectRepository(city_entity_1.City)),
    __param(10, typeorm_1.InjectRepository(delegation_entity_1.Delegation)),
    __param(11, typeorm_1.InjectRepository(role_entity_1.Role)),
    __param(12, typeorm_1.InjectRepository(sesion_entity_1.Sesion)),
    __param(13, typeorm_1.InjectRepository(configuration_entity_1.Configuration)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        mailer_1.MailerService,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map
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
const mailer_1 = require("@nest-modules/mailer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
let UserService = class UserService {
    constructor(userRepository, mailerService, tokenRepository, typeRepository, chainRepository) {
        this.userRepository = userRepository;
        this.mailerService = mailerService;
        this.tokenRepository = tokenRepository;
        this.typeRepository = typeRepository;
        this.chainRepository = chainRepository;
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
                    error: 'Error creating',
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
    create(createUserDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("*** Por registrar: ", createUserDTO);
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
};
UserService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(user_entity_1.User)),
    __param(2, typeorm_1.InjectRepository(token_entity_1.Token)),
    __param(3, typeorm_1.InjectRepository(type_entity_1.Type)),
    __param(4, typeorm_1.InjectRepository(chain_entity_1.Chain)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        mailer_1.MailerService,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map
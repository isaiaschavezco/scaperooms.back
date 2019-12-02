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
const sesion_entity_1 = require("./sesion.entity");
const user_entity_1 = require("../user/user.entity");
const bcrypt = require("bcrypt");
const moment = require("moment");
let SesionService = class SesionService {
    constructor(sesionRepository, userRepository) {
        this.sesionRepository = sesionRepository;
        this.userRepository = userRepository;
    }
    RequesLogin(requestDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let response = null;
                const user = yield this.userRepository.findOne({
                    relations: ["type"],
                    where: { email: requestDTO.email }
                });
                if (user) {
                    const match = yield bcrypt.compare(requestDTO.password, user.password);
                    if (match) {
                        const sesionExist = yield this.sesionRepository.findOne({
                            where: { user: user }
                        });
                        if (sesionExist) {
                            yield this.sesionRepository.remove(sesionExist);
                        }
                        const sesion = this.sesionRepository.create({
                            user: user
                        });
                        const loggedUser = yield this.sesionRepository.save(sesion);
                        console.log("user: ", user);
                        console.log("sesion: ", loggedUser);
                        const completeName = user.name.split(" ")[0] + " " + user.lastName.split(" ")[0];
                        response = {
                            token: loggedUser.id,
                            name: completeName,
                            nickname: user.nickname,
                            gender: user.gender,
                            image: user.photo,
                            birthday: moment(new Date(user.birthDate)).format('DD-MM-YYYY'),
                            phonenumber: user.phone,
                            email: user.email,
                            type: user.type.id,
                            totalPoints: user.points
                        };
                    }
                    else {
                        response = { status: 2 };
                    }
                }
                else {
                    response = { status: 1 };
                }
                return response;
            }
            catch (err) {
                console.log("SesionService - RequesLogin: ", err);
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Error requesting login',
                }, 500);
            }
        });
    }
};
SesionService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(sesion_entity_1.Sesion)),
    __param(1, typeorm_1.InjectRepository(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], SesionService);
exports.SesionService = SesionService;
//# sourceMappingURL=sesion.service.js.map
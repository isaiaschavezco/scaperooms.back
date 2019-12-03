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
const city_entity_1 = require("./city.entity");
let CityService = class CityService {
    constructor(cityRepository) {
        this.cityRepository = cityRepository;
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const citiesList = yield this.cityRepository.find({
                    order: {
                        name: "ASC"
                    }
                });
                return { states: citiesList };
            }
            catch (err) {
                console.log("CityService - findAll: ", err);
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Error getting states',
                }, 500);
            }
        });
    }
    findStateById(stateId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const state = yield this.cityRepository.findOne(stateId);
                return { state: state };
            }
            catch (err) {
                console.log("CityService - findStateById: ", err);
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Error getting state',
                }, 500);
            }
        });
    }
};
CityService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(city_entity_1.City)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CityService);
exports.CityService = CityService;
//# sourceMappingURL=city.service.js.map
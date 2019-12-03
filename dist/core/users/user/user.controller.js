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
const user_service_1 = require("./user.service");
const user_dto_1 = require("./user.dto");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    create(inviteUserDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userService.invite(inviteUserDTO);
        });
    }
    findAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userService.findAll();
        });
    }
    findUserDetail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userService.findUserDetail(email);
        });
    }
    createUser(createUserDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userService.create(createUserDTO);
        });
    }
    createNAOSUser(createNAOSUserDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userService.createNAOS(createNAOSUserDTO);
        });
    }
    createDrugStoreUser(createDrugStoreUserDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userService.createDrugStore(createDrugStoreUserDTO);
        });
    }
    updateNAOSUser(updateNAOSUserDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userService.updateNAOS(updateNAOSUserDTO);
        });
    }
    updateDrugStoreUser(updateDrugStoreUserDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userService.updateDrugStore(updateDrugStoreUserDTO);
        });
    }
};
__decorate([
    common_1.Post('invite'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.InviteUserDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findAllUsers", null);
__decorate([
    common_1.Get(':email'),
    __param(0, common_1.Param('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findUserDetail", null);
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.CreateUserDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
__decorate([
    common_1.Post('naos'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.CreateNAOSUserDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createNAOSUser", null);
__decorate([
    common_1.Post('drugstore'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.CreateDrugStoreUserDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createDrugStoreUser", null);
__decorate([
    common_1.Put('naos'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UpdateNAOSUserDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateNAOSUser", null);
__decorate([
    common_1.Put('drugstore'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UpdateDrugStoreUserDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateDrugStoreUser", null);
UserController = __decorate([
    common_1.Controller('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map
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
const target_service_1 = require("./target.service");
const target_dto_1 = require("./target.dto");
let TargetController = class TargetController {
    constructor(targetService) {
        this.targetService = targetService;
    }
    findAllTargets() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.targetService.findAllTargets();
        });
    }
    create(createDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.targetService.create(createDTO);
        });
    }
    delete(deleteDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.targetService.delete(deleteDTO);
        });
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TargetController.prototype, "findAllTargets", null);
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [target_dto_1.CreateTargetDTO]),
    __metadata("design:returntype", Promise)
], TargetController.prototype, "create", null);
__decorate([
    common_1.Delete(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [target_dto_1.DeleteTargetDTO]),
    __metadata("design:returntype", Promise)
], TargetController.prototype, "delete", null);
TargetController = __decorate([
    common_1.Controller('target'),
    __metadata("design:paramtypes", [target_service_1.TargetService])
], TargetController);
exports.TargetController = TargetController;
//# sourceMappingURL=target.controller.js.map
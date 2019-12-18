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
const submenu_service_1 = require("./submenu.service");
const submenu_dto_1 = require("./submenu.dto");
let SubmenuController = class SubmenuController {
    constructor(submenuService) {
        this.submenuService = submenuService;
    }
    findByMenuId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.submenuService.findByMenuId(id);
        });
    }
    findFilesByMenu(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.submenuService.findFilesByMenu(id);
        });
    }
    findSubMenuItems(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.submenuService.findSubMenuItems(id);
        });
    }
    create(createSubmenuDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.submenuService.create(createSubmenuDTO);
        });
    }
};
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SubmenuController.prototype, "findByMenuId", null);
__decorate([
    common_1.Get('app/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SubmenuController.prototype, "findFilesByMenu", null);
__decorate([
    common_1.Get('items/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SubmenuController.prototype, "findSubMenuItems", null);
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [submenu_dto_1.CreateSubmenuDTO]),
    __metadata("design:returntype", Promise)
], SubmenuController.prototype, "create", null);
SubmenuController = __decorate([
    common_1.Controller('submenu'),
    __metadata("design:paramtypes", [submenu_service_1.SubmenuService])
], SubmenuController);
exports.SubmenuController = SubmenuController;
//# sourceMappingURL=submenu.controller.js.map
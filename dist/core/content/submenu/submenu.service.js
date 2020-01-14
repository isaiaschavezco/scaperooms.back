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
const submenu_entity_1 = require("./submenu.entity");
let SubmenuService = class SubmenuService {
    constructor(submenuRepository) {
        this.submenuRepository = submenuRepository;
    }
    findByMenuId(menuId) {
        return __awaiter(this, void 0, void 0, function* () {
            const submenuList = yield this.submenuRepository.find({
                where: { menu: menuId },
                order: {
                    name: "ASC"
                }
            });
            return submenuList;
        });
    }
    deleteFile(submenuId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let fileToDelete = yield this.submenuRepository.findOne(submenuId);
                fileToDelete.fileName = '';
                fileToDelete.url = '';
                fileToDelete.title = '';
                yield this.submenuRepository.save(fileToDelete);
                return { status: 0 };
            }
            catch (err) {
                console.log("SubmenuService - deleteFile: ", err);
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Error deleting file',
                }, 500);
            }
        });
    }
    findFilesByMenu(menuId) {
        return __awaiter(this, void 0, void 0, function* () {
            let productList = [];
            if (menuId == 1) {
                productList = yield this.submenuRepository.find({
                    where: { menu: 2 },
                    order: {
                        name: "ASC"
                    }
                });
            }
            const submenuList = yield this.submenuRepository.find({
                where: { menu: menuId },
                order: {
                    name: "ASC"
                }
            });
            let listToReturn = [];
            submenuList.forEach(tempFile => {
                let tempPDF = '';
                if (menuId == 1) {
                    switch (tempFile.id) {
                        case 2:
                            tempPDF = productList[6].url;
                            break;
                        case 3:
                            tempPDF = productList[5].url;
                            break;
                        case 4:
                            tempPDF = productList[2].url;
                            break;
                        case 5:
                            tempPDF = productList[4].url;
                            break;
                        case 6:
                            tempPDF = productList[3].url;
                            break;
                        case 7:
                            tempPDF = productList[0].url;
                            break;
                        case 8:
                            tempPDF = productList[1].url;
                            break;
                        default:
                            break;
                    }
                }
                listToReturn.push({
                    id: tempFile.id,
                    name: tempFile.name,
                    pdf: tempFile.url,
                    product: tempPDF
                });
            });
            if (menuId == 2) {
                listToReturn.sort(function (a, b) {
                    return a.id - b.id;
                });
            }
            return { files: listToReturn };
        });
    }
    findSubMenuItems(menuId) {
        return __awaiter(this, void 0, void 0, function* () {
            const submenuItems = yield this.submenuRepository.find({
                select: ["id", "name"], where: { menu: menuId }, order: {
                    name: "ASC"
                }
            });
            let submenuToReturn = [];
            submenuItems.forEach(submenu => {
                submenuToReturn.push({
                    value: submenu.id,
                    label: submenu.name.toUpperCase()
                });
            });
            return submenuToReturn;
        });
    }
    create(request) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let status = 0;
                const baseURl = "https://bioderma-space.sfo2.cdn.digitaloceanspaces.com/";
                const position = request.fileUrl.indexOf("capacitacion/");
                let submenu = yield this.submenuRepository.findOne(request.submenu);
                if (submenu.title !== '') {
                    status = 1;
                }
                else {
                    submenu.createdAt = new Date();
                    submenu.title = request.title;
                    submenu.fileName = request.fileUrl.substring(position, request.fileUrl.length);
                    submenu.url = baseURl + request.fileUrl.substring(position, request.fileUrl.length);
                    yield this.submenuRepository.save(submenu);
                }
                return status;
            }
            catch (err) {
                console.log("SubmenuService - create: ", err);
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Error creating',
                }, 500);
            }
        });
    }
};
SubmenuService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(submenu_entity_1.Submenu)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SubmenuService);
exports.SubmenuService = SubmenuService;
//# sourceMappingURL=submenu.service.js.map
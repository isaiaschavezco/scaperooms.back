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
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
let Configuration = class Configuration {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Configuration.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], Configuration.prototype, "isClubBiodermaActive", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Configuration.prototype, "themes", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], Configuration.prototype, "isBiodermaGameActive", void 0);
__decorate([
    typeorm_1.Column({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Configuration.prototype, "biodermaGameImage", void 0);
__decorate([
    typeorm_1.Column({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Configuration.prototype, "biodermaGameCampaingImage", void 0);
__decorate([
    typeorm_1.Column({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Configuration.prototype, "biodermaGameBlogImage", void 0);
Configuration = __decorate([
    typeorm_1.Entity({ schema: 'Users' })
], Configuration);
exports.Configuration = Configuration;
//# sourceMappingURL=configuration.entity.js.map
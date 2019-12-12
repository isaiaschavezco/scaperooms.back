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
const tag_entity_1 = require("../tag/tag.entity");
let Article = class Article {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Article.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ length: 100 }),
    __metadata("design:type", String)
], Article.prototype, "title", void 0);
__decorate([
    typeorm_1.Column({ length: 250 }),
    __metadata("design:type", String)
], Article.prototype, "image", void 0);
__decorate([
    typeorm_1.Column({ length: 100 }),
    __metadata("design:type", String)
], Article.prototype, "subtitle", void 0);
__decorate([
    typeorm_1.Column({ type: "text" }),
    __metadata("design:type", String)
], Article.prototype, "galery", void 0);
__decorate([
    typeorm_1.Column({ type: "text" }),
    __metadata("design:type", String)
], Article.prototype, "content", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], Article.prototype, "isBiodermaGame", void 0);
__decorate([
    typeorm_1.Column({ type: "timestamp without time zone", default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], Article.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.ManyToMany(type => tag_entity_1.Tag, tag => tag.article),
    typeorm_1.JoinTable({ name: "articlesByTag" }),
    __metadata("design:type", Array)
], Article.prototype, "tag", void 0);
Article = __decorate([
    typeorm_1.Entity({ schema: 'Content' })
], Article);
exports.Article = Article;
//# sourceMappingURL=article.entity.js.map
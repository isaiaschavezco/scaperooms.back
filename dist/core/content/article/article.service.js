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
const article_entity_1 = require("./article.entity");
const tag_entity_1 = require("../tag/tag.entity");
const moment = require("moment");
let ArticleService = class ArticleService {
    constructor(articleRepository, tagRepository) {
        this.articleRepository = articleRepository;
        this.tagRepository = tagRepository;
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const articlesList = yield this.articleRepository.find({
                    order: {
                        createdAt: "DESC"
                    }
                });
                return { blogs: articlesList };
            }
            catch (err) {
                console.log("ArticleService - findAll: ", err);
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Error getting articles',
                }, 500);
            }
        });
    }
    findListArticles(isBiodermaGame) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let listToReturn = [];
                const articlesList = yield this.articleRepository.find({
                    relations: ["tag"],
                    where: { isBiodermaGame: isBiodermaGame },
                    order: {
                        createdAt: "DESC"
                    }
                });
                articlesList.forEach(article => {
                    listToReturn.push({
                        id: article.id,
                        title: article.title,
                        createdAt: moment(article.createdAt).format('DD/MMM/YYYY'),
                        tags: article.tag
                    });
                });
                return { blogs: listToReturn };
            }
            catch (err) {
                console.log("ArticleService - findListArticles: ", err);
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Error getting articles',
                }, 500);
            }
        });
    }
    createArticle(createDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("createDTO: ", createDTO);
                const articleTags = yield this.tagRepository.findByIds(createDTO.tags);
                let newArticle = this.articleRepository.create({
                    title: createDTO.title,
                    image: createDTO.image,
                    content: createDTO.content,
                    subtitle: createDTO.subtitle,
                    galery: createDTO.galery,
                    isBiodermaGame: createDTO.isBiodermaGame,
                    tag: articleTags
                });
                yield this.articleRepository.save(newArticle);
                return { status: 0 };
            }
            catch (err) {
                console.log("ArticleService - createArticle: ", err);
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Error creating articles',
                }, 500);
            }
        });
    }
    searchForArticlesList(getArticleList) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let listToReturn = [];
                let query;
                if (getArticleList.filter) {
                    const tagId = yield this.tagRepository.findOne({
                        where: { name: getArticleList.filter.toUpperCase() }
                    });
                    console.log("tagId", tagId);
                    if (!tagId) {
                        query = { isBiodermaGame: getArticleList.isBiodermaGame, title: typeorm_2.Like(`%${getArticleList.filter}%`) };
                    }
                    else {
                        query = [
                            { isBiodermaGame: getArticleList.isBiodermaGame, title: typeorm_2.Like(`%${getArticleList.filter}%`) },
                            { isBiodermaGame: getArticleList.isBiodermaGame, tag: { name: typeorm_2.Like(`%${getArticleList.filter}%`) } }
                        ];
                    }
                }
                else {
                    query = { isBiodermaGame: getArticleList.isBiodermaGame };
                }
                return { blogs: listToReturn };
            }
            catch (err) {
                console.log("ArticleService - searchForArticlesList: ", err);
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Error getting articles',
                }, 500);
            }
        });
    }
};
ArticleService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(article_entity_1.Article)),
    __param(1, typeorm_1.InjectRepository(tag_entity_1.Tag)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ArticleService);
exports.ArticleService = ArticleService;
//# sourceMappingURL=article.service.js.map
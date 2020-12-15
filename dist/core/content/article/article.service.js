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
const target_entity_1 = require("./../../trivia/target/target.entity");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const article_entity_1 = require("./article.entity");
const tag_entity_1 = require("../tag/tag.entity");
const moment = require("moment");
let ArticleService = class ArticleService {
    constructor(articleRepository, tagRepository, targetRepository) {
        this.articleRepository = articleRepository;
        this.tagRepository = tagRepository;
        this.targetRepository = targetRepository;
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const articlesList = yield this.articleRepository.find({
                    relations: [
                        'target',
                        'target.city',
                        'target.chain',
                        'target.clinic',
                        'target.position',
                        'target.type'
                    ],
                    order: {
                        createdAt: 'DESC'
                    }
                });
                return { blogs: articlesList };
            }
            catch (err) {
                console.log('ArticleService - findAll: ', err);
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Error getting articles'
                }, 500);
            }
        });
    }
    findById(articleId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let response = {};
                const articleToReturn = yield this.articleRepository.findOne(articleId, {
                    relations: [
                        'tag',
                        'target',
                        'target.city',
                        'target.chain',
                        'target.clinic',
                        'target.position',
                        'target.type'
                    ]
                });
                console.log('articleToReturn: ', articleToReturn);
                if (articleToReturn) {
                    response = {
                        title: articleToReturn.title,
                        subtitle: articleToReturn.subtitle,
                        date: moment(articleToReturn.createdAt).format('DD/MM/YYYY'),
                        tags: articleToReturn.tag,
                        images: JSON.parse(articleToReturn.galery),
                        description: articleToReturn.content,
                        targets: articleToReturn.target
                    };
                }
                return {
                    blogs: response
                };
            }
            catch (err) {
                console.log('ArticleService - findById: ', err);
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Error getting articles'
                }, 500);
            }
        });
    }
    findListArticles(requestDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let listToReturn = [];
                console.log(requestDTO);
                const articlesList = yield this.articleRepository.find({
                    relations: [
                        'tag',
                        'target',
                        'target.city',
                        'target.chain',
                        'target.clinic',
                        'target.position',
                        'target.type'
                    ],
                    where: {
                        isBiodermaGame: requestDTO.isBiodermaGame,
                        isBlogNaos: requestDTO.isBiodermaGame ? false : requestDTO.isBlogNaos,
                        isBlogEsthederm: requestDTO.isBiodermaGame
                            ? false
                            : requestDTO.isBlogEsthederm,
                        isAll: requestDTO.isBiodermaGame ? false : requestDTO.isAll
                    },
                    order: {
                        createdAt: 'DESC'
                    }
                });
                articlesList.forEach(article => {
                    listToReturn.push({
                        id: article.id,
                        title: article.title,
                        createdAt: moment(article.createdAt).format('DD/MM/YYYY'),
                        tags: article.tag,
                        targets: article.target
                    });
                });
                return { blogs: listToReturn };
            }
            catch (err) {
                console.log('ArticleService - findListArticles: ', err);
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Error getting articles'
                }, 500);
            }
        });
    }
    createArticle(createDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const articleTags = yield this.tagRepository.findByIds(createDTO.tags);
                const articleTargets = yield this.targetRepository.findByIds(createDTO.targets, {
                    relations: ['clinic', 'chain', 'position', 'type', 'delegation']
                });
                let newArticle = this.articleRepository.create({
                    title: createDTO.title,
                    image: createDTO.image,
                    content: createDTO.content,
                    subtitle: createDTO.subtitle,
                    galery: createDTO.galery,
                    isBiodermaGame: createDTO.isBiodermaGame,
                    tag: articleTags,
                    isBlogNaos: createDTO.isBiodermaGame ? null : createDTO.isBlogNaos,
                    isBlogEsthederm: createDTO.isBiodermaGame
                        ? null
                        : createDTO.isBlogEsthederm,
                    isAll: createDTO.isAll,
                    target: articleTargets
                });
                yield this.articleRepository.save(newArticle);
                return { status: 0 };
            }
            catch (err) {
                console.log('ArticleService - createArticle: ', err);
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Error creating articles'
                }, 500);
            }
        });
    }
    searchForArticlesList(getArticleList) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(' getArticleList: ', getArticleList);
            const { type, userState, userChain, userClinic, userPosition } = getArticleList;
            const relations = ['city', 'chain', 'position', 'type', 'delegation'];
            const ArticlesToSend = [];
            let whereStr = '';
            const pagesSkip = getArticleList.page;
            const stringFilter = getArticleList.filter;
            let mainStr = '(art.title LIKE :filter OR tag.name LIKE :tagFilter) AND (art.isBiodermaGame = false)';
            let whereAllUsers = '(art.isAll = true) AND ( art.title LIKE :filter OR tag.name LIKE :tagFilter )';
            try {
                if (getArticleList.isBiodermaGame) {
                    whereStr =
                        '(art.isBiodermaGame = true ) AND ( art.title LIKE :filter OR tag.name LIKE :tagFilter )';
                    const allBioderma = yield this.searchDB(whereStr, pagesSkip, stringFilter);
                    return { blogs: [...allBioderma] };
                }
                else {
                    if (type === 1) {
                        const mainNaosStr = 'AND (art.isBlogNaos = true)';
                        whereStr = `${mainStr} ${mainNaosStr} `;
                        const articlesWhereStr = yield this.searchDB(whereStr, pagesSkip, stringFilter);
                        yield Promise.all(articlesWhereStr.map((article) => __awaiter(this, void 0, void 0, function* () {
                            if (article.isAll)
                                ArticlesToSend.push(article);
                            else if (article.targets.length === 0)
                                ArticlesToSend.push(article);
                            else {
                                const articleTargets = yield this.targetRepository.findByIds(article.targets, { relations });
                                articleTargets.forEach(target => {
                                    if (target.allUsers)
                                        ArticlesToSend.push(article);
                                    else if (target.position !== null && target.city !== null) {
                                        if (target.city.id === userState &&
                                            target.position.id === userPosition) {
                                            ArticlesToSend.push(article);
                                        }
                                    }
                                    else if (target.city !== null) {
                                        if (target.city.id === userState) {
                                            ArticlesToSend.push(article);
                                        }
                                    }
                                    else if (target.position !== null) {
                                        if (target.position.id === userPosition) {
                                            ArticlesToSend.push(article);
                                        }
                                    }
                                });
                            }
                        })));
                    }
                    if (type === 2) {
                        const mainPharmaStr = 'AND (art.isBlogNaos = false) AND (art.isBlogEsthederm = false) AND (art.isAll = false)';
                        whereStr = `${mainStr} ${mainPharmaStr}`;
                        const articlesWhereStr = yield this.searchDB(whereStr, pagesSkip, stringFilter);
                        yield Promise.all(articlesWhereStr.map((article) => __awaiter(this, void 0, void 0, function* () {
                            if (article.isAll)
                                ArticlesToSend.push(article);
                            else if (article.targets.length === 0)
                                ArticlesToSend.push(article);
                            else {
                                const articleTargets = yield this.targetRepository.findByIds(article.targets, {
                                    relations
                                });
                                articleTargets.forEach(target => {
                                    const { allUsers, chain, city } = target;
                                    if (allUsers)
                                        ArticlesToSend.push(article);
                                    else if (chain !== null && city !== null) {
                                        if (city.id === userState && chain.id === userChain) {
                                            ArticlesToSend.push(article);
                                        }
                                    }
                                    else if (city !== null && city.id === userState) {
                                        ArticlesToSend.push(article);
                                    }
                                    else if (chain !== null && chain.id === userChain) {
                                        ArticlesToSend.push(article);
                                    }
                                });
                            }
                        })));
                    }
                    if (type === 3) {
                        let mainEstheStr = 'AND (art.isBlogEsthederm = true)';
                        whereStr = `${mainStr} ${mainEstheStr}`;
                        const articlesWhereStr = yield this.searchDB(whereStr, pagesSkip, stringFilter);
                        yield Promise.all(articlesWhereStr.map((article) => __awaiter(this, void 0, void 0, function* () {
                            if (article.isAll)
                                ArticlesToSend.push(article);
                            else if (article.targets.length === 0)
                                ArticlesToSend.push(article);
                            else {
                                const articleTargets = yield this.targetRepository.findByIds(article.targets, {
                                    relations: [
                                        'city',
                                        'chain',
                                        'clinic',
                                        'position',
                                        'type',
                                        'delegation'
                                    ]
                                });
                                articleTargets.forEach(target => {
                                    if (target.allUsers)
                                        ArticlesToSend.push(article);
                                    else if (target.clinic !== null && target.city !== null) {
                                        if (target.city.id === userState &&
                                            target.clinic.id === userClinic) {
                                            ArticlesToSend.push(article);
                                        }
                                    }
                                    else if (target.city !== null &&
                                        target.city.id === userState) {
                                        ArticlesToSend.push(article);
                                    }
                                    else if (target.clinic !== null &&
                                        target.clinic.id === userClinic) {
                                        ArticlesToSend.push(article);
                                    }
                                });
                            }
                        })));
                    }
                    const articlesToAAAllUsers = yield this.searchDB(whereAllUsers, pagesSkip, stringFilter);
                    return { blogs: [...ArticlesToSend, ...articlesToAAAllUsers] };
                }
            }
            catch (err) {
                console.log('ArticleService - searchForArticlesList: ', err);
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Error getting articles'
                }, 500);
            }
        });
    }
    searchDB(whereString, pages, filter) {
        return __awaiter(this, void 0, void 0, function* () {
            let listToReturn = [];
            const Articles = yield this.articleRepository
                .createQueryBuilder('art')
                .distinct(true)
                .select([
                'art.id',
                'art.title',
                'art.subtitle',
                'art.image',
                'art.createdAt',
                'art.isAll',
                'art.isBlogNaos',
                'art.isBlogEsthederm'
            ])
                .leftJoinAndSelect('art.tag', 'tag')
                .leftJoinAndSelect('art.target', 'target')
                .where(whereString, {
                filter: '%' + filter + '%',
                tagFilter: '%' + filter.toUpperCase() + '%'
            })
                .printSql()
                .skip(pages * 10)
                .take(10)
                .orderBy('art.createdAt', 'DESC')
                .getMany();
            Articles.forEach(article => {
                listToReturn.push({
                    id: article.id,
                    isAll: article.isAll,
                    isBlogNaos: article.isBlogNaos,
                    isBlogEsthederm: article.isBlogEsthederm,
                    title: article.title,
                    subtitle: article.subtitle,
                    date: moment(article.createdAt).format('DD/MM/YYYY'),
                    imageURL: article.image,
                    tags: article.tag,
                    targets: article.target
                });
            });
            return listToReturn;
        });
    }
    searchOnFilter(target, specialField, compare, article, userState) {
        return __awaiter(this, void 0, void 0, function* () {
            const ArticlesToSend = [];
            if (target.allUsers)
                ArticlesToSend.push(article);
            else if (specialField !== null && target.city !== null) {
                if (target.city.id === userState && specialField.id === compare) {
                    ArticlesToSend.push(article);
                }
            }
            else if (target.city !== null && target.city.id === userState) {
                ArticlesToSend.push(article);
            }
            else if (specialField !== null && specialField.id === compare) {
                ArticlesToSend.push(article);
            }
            return ArticlesToSend;
        });
    }
    deleteArticle(articleId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const articleToDelete = yield this.articleRepository.findOne(articleId, {
                    relations: ['tag', 'target']
                });
                yield this.articleRepository.remove(articleToDelete);
                return { status: 0 };
            }
            catch (err) {
                console.log('ArticleService - deleteArticle: ', err);
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Error removing article'
                }, 500);
            }
        });
    }
    update(updateDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const articleTags = yield this.tagRepository.findByIds(updateDTO.tags);
                const articleTargets = yield this.targetRepository.findByIds(updateDTO.targets, {
                    relations: ['clinic', 'chain', 'position', 'type', 'delegation']
                });
                let articleToUpdate = yield this.articleRepository.findOne(updateDTO.id);
                articleToUpdate.galery = updateDTO.galery;
                articleToUpdate.subtitle = updateDTO.subtitle;
                articleToUpdate.content = updateDTO.content;
                articleToUpdate.tag = articleTags;
                articleToUpdate.target = articleTargets;
                yield this.articleRepository.save(articleToUpdate);
                return { status: 0 };
            }
            catch (err) {
                console.log('ArticleService - update: ', err);
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Error updating article'
                }, 500);
            }
        });
    }
};
ArticleService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(article_entity_1.Article)),
    __param(1, typeorm_1.InjectRepository(tag_entity_1.Tag)),
    __param(2, typeorm_1.InjectRepository(target_entity_1.Target)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ArticleService);
exports.ArticleService = ArticleService;
//# sourceMappingURL=article.service.js.map
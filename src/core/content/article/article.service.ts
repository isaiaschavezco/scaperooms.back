import { Target } from './../../trivia/target/target.entity';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, In } from 'typeorm';
import { Article } from './article.entity';
import { Tag } from '../tag/tag.entity';
import { CreateArticleDTO, GetArticleList, GetArticlesList, UpdateArticleDTO } from './article.dto';
import * as moment from 'moment';

@Injectable()
export class ArticleService {

    constructor(
        @InjectRepository(Article) private articleRepository: Repository<Article>,
        @InjectRepository(Tag) private tagRepository: Repository<Tag>,
        @InjectRepository(Target) private targetRepository: Repository<Target>) { }
         

    async findAll(): Promise<any> {
        try {
            const articlesList = await this.articleRepository.find({
                relations: ["target", "target.city", "target.chain","target.clinic", "target.position", "target.type"],
                order: {
                    createdAt: "DESC"
                }
            });
            return { blogs: articlesList };
        } catch (err) {
            console.log("ArticleService - findAll: ", err);

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error getting articles',
            }, 500);
        }
    }

    async findById(articleId: number): Promise<any> {
        try {

            let response = {};

            const articleToReturn = await this.articleRepository.findOne(articleId, {
                relations: ["tag","target","target.city", "target.chain","target.clinic", "target.position", "target.type"]
            });
            console.log("articleToReturn: ",articleToReturn);

            if (articleToReturn) {
                response = {
                    title: articleToReturn.title,
                    subtitle: articleToReturn.subtitle,
                    date: moment(articleToReturn.createdAt).format('DD/MM/YYYY'),
                    tags: articleToReturn.tag,
                    images: JSON.parse(articleToReturn.galery),
                    description: articleToReturn.content,
                    targets:articleToReturn.target
                };
            }

            return {
                blogs: response
            };
        } catch (err) {
            console.log("ArticleService - findById: ", err);

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error getting articles',
            }, 500);
        }
    }

    async findListArticles(requestDTO: GetArticlesList): Promise<any> {
        try {
            let listToReturn = [];
            console.log(requestDTO)
            const articlesList = await this.articleRepository.find({
                relations: ["tag","target","target.city", "target.chain","target.clinic", "target.position", "target.type"],
                where: { 
                isBiodermaGame: requestDTO.isBiodermaGame,
                isBlogNaos: requestDTO.isBiodermaGame ? null : requestDTO.isBlogNaos,
                isBlogEsthederm: requestDTO.isBiodermaGame ? null : requestDTO.isBlogEsthederm,
                isAll: requestDTO.isBiodermaGame ? null : requestDTO.isAll
                 },
                order: {
                    createdAt: "DESC"
                }
            });

            articlesList.forEach(article => {
                listToReturn.push({
                    id: article.id,
                    title: article.title,
                    createdAt: moment(article.createdAt).format('DD/MM/YYYY'),
                    tags: article.tag,
                    targets:article.target
                });
            });

            return { blogs: listToReturn };
        } catch (err) {
            console.log("ArticleService - findListArticles: ", err);

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error getting articles',
            }, 500);
        }
    }

    async createArticle(createDTO: CreateArticleDTO): Promise<any> {
        try {

            // console.log("createDTO: ", createDTO);

            const articleTags = await this.tagRepository.findByIds(createDTO.tags);

            const articleTargets = await this.targetRepository.findByIds(createDTO.targets, {
                        relations: ["clinic","chain", "position", "type", "delegation"] //<----probablemente sea city
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
                isBlogEsthederm: createDTO.isBiodermaGame ? null : createDTO.isBlogEsthederm,
                isAll: createDTO.isAll,
                target: articleTargets
            });

            await this.articleRepository.save(newArticle);

            return { status: 0 };
        } catch (err) {
            console.log("ArticleService - createArticle: ", err);

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error creating articles',
            }, 500);
        }
    }

    async searchForArticlesList(getArticleList: GetArticleList): Promise<any> {

        try {
            let listToReturn = [];

            let whereString = "";

            if (getArticleList.isBiodermaGame) {
                whereString = "(art.isBiodermaGame = :isBiodermaGame ) AND ( art.title LIKE :filter OR tag.name LIKE :tagFilter )";
            } else {
                whereString = "(art.isBiodermaGame = :isBiodermaGame ) AND ( art.title LIKE :filter OR tag.name LIKE :tagFilter ) AND (art.isBlogNaos = :isBlogNaos) AND (art.isBlogEsthederm = :isBlogEsthederm) AND (art.isAll = :isAll) OR (art.isAll = null) AND (art.isAll = :isAll) OR (art.isAll = null) AND (target.city  :cityFilter) AND (target.clinic :clinicFilter) AND       (target.chain :chainFilter) AND (target.position :positionFilter)";
            }

            const articleList2 = await this.articleRepository.createQueryBuilder("art")
                .distinct(true)
                .select(["art.id", "art.title", "art.subtitle", "art.image", "art.createdAt"])
                .leftJoinAndSelect("art.tag", "tag")
                .leftJoinAndSelect("art.target", "target")
                .where(whereString, 
                { 
                    isBiodermaGame: getArticleList.isBiodermaGame,
                    filter: '%' + getArticleList.filter + '%', tagFilter: '%' + getArticleList.filter.toUpperCase() + '%',
                    isBlogNaos: getArticleList.type == 1 ? true : false,
                    isBlogEsthederm: getArticleList.type == 3 ? true : false,
                    isAll: false,
                    cityFilter: getArticleList.userState,
                    clinicFilter: getArticleList.userChain,
                    chainFilter: getArticleList.userClinic,
                    positionFilter: getArticleList.userPosition
                })
                .skip(getArticleList.page * 10)
                .take(10)
                .orderBy("art.createdAt", "DESC")
                .getMany();

            articleList2.forEach(article => {
                listToReturn.push({
                    id: article.id,
                    title: article.title,
                    subtitle: article.subtitle,
                    date: moment(article.createdAt).format('DD/MM/YYYY'),
                    imageURL: article.image,
                    tags: article.tag
                });
            });

            return { blogs: listToReturn };
        } catch (err) {
            console.log("ArticleService - searchForArticlesList: ", err);

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error getting articles',
            }, 500);
        }
    }

    async deleteArticle(articleId: number): Promise<any> {
        try {

            const articleToDelete = await this.articleRepository.findOne(articleId, {
                relations: ["tag","target"]
            });

            await this.articleRepository.remove(articleToDelete);

            return { status: 0 };
        } catch (err) {
            console.log("ArticleService - deleteArticle: ", err);

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error removing article',
            }, 500);
        }
    }

    async update(updateDTO: UpdateArticleDTO): Promise<any> {
        try {

            const articleTags = await this.tagRepository.findByIds(updateDTO.tags);
            const articleTargets = await this.targetRepository.findByIds(updateDTO.targets , {
                        relations: ["clinic","chain", "position", "type", "delegation"] //<----probablemente sea city
                    });

            let articleToUpdate = await this.articleRepository.findOne(updateDTO.id);

            articleToUpdate.galery = updateDTO.galery;
            articleToUpdate.subtitle = updateDTO.subtitle;
            articleToUpdate.content = updateDTO.content;
            articleToUpdate.tag = articleTags;
            articleToUpdate.target = articleTargets;

            await this.articleRepository.save(articleToUpdate);

            return { status: 0 };
        } catch (err) {
            console.log("ArticleService - update: ", err);

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error updating article',
            }, 500);
        }
    }

    // async findStateById(stateId: number): Promise<any> {
    //     try {
    //         const state = await this.cityRepository.findOne(stateId);
    //         return { state: state };
    //     } catch (err) {
    //         console.log("CityService - findStateById: ", err);

    //         throw new HttpException({
    //             status: HttpStatus.INTERNAL_SERVER_ERROR,
    //             error: 'Error getting state',
    //         }, 500);
    //     }
    // }

}
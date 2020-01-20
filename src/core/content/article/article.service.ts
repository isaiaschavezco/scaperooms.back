import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, In } from 'typeorm';
import { Article } from './article.entity';
import { Tag } from '../tag/tag.entity';
import { CreateArticleDTO, GetArticleList, GetArticlesList, UpdateArticleDTO } from './article.dto';
import * as moment from 'moment';

@Injectable()
export class ArticleService {

    constructor(@InjectRepository(Article) private articleRepository: Repository<Article>,
        @InjectRepository(Tag) private tagRepository: Repository<Tag>) { }

    async findAll(): Promise<any> {
        try {
            const articlesList = await this.articleRepository.find({
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
                relations: ["tag"]
            });

            if (articleToReturn) {
                response = {
                    title: articleToReturn.title,
                    subtitle: articleToReturn.subtitle,
                    date: moment(articleToReturn.createdAt).format('DD/MMM/YYYY'),
                    tags: articleToReturn.tag,
                    images: JSON.parse(articleToReturn.galery),
                    description: articleToReturn.content
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

            const articlesList = await this.articleRepository.find({
                relations: ["tag"],
                where: { isBiodermaGame: requestDTO.isBiodermaGame, isBlogNaos: requestDTO.isBiodermaGame ? null : requestDTO.isBlogNaos },
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

            let newArticle = this.articleRepository.create({
                title: createDTO.title,
                image: createDTO.image,
                content: createDTO.content,
                subtitle: createDTO.subtitle,
                galery: createDTO.galery,
                isBiodermaGame: createDTO.isBiodermaGame,
                tag: articleTags,
                isBlogNaos: createDTO.isBiodermaGame ? null : createDTO.isBlogNaos
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
                whereString = "(art.isBiodermaGame = :isBiodermaGame ) AND ( art.title LIKE :filter OR tag.name LIKE :tagFilter ) AND (art.isBlogNaos = :isBlogNaos)";
            }

            const articleList2 = await this.articleRepository.createQueryBuilder("art")
                .distinct(true)
                .select(["art.id", "art.title", "art.subtitle", "art.image", "art.createdAt"])
                .leftJoinAndSelect("art.tag", "tag")
                .where(whereString, { isBiodermaGame: getArticleList.isBiodermaGame, filter: '%' + getArticleList.filter + '%', tagFilter: '%' + getArticleList.filter.toUpperCase() + '%', isBlogNaos: getArticleList.type == 1 ? true : false })
                .skip(getArticleList.page * 10)
                .take(10)
                .orderBy("art.createdAt", "DESC")
                .getMany();

            articleList2.forEach(article => {
                listToReturn.push({
                    id: article.id,
                    title: article.title,
                    subtitle: article.subtitle,
                    date: moment(article.createdAt).format('DD/MMM/YYYY'),
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
                relations: ["tag"]
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

            let articleToUpdate = await this.articleRepository.findOne(updateDTO.id);

            articleToUpdate.image = updateDTO.image;
            articleToUpdate.subtitle = updateDTO.subtitle;
            articleToUpdate.content = updateDTO.content;
            articleToUpdate.tag = articleTags;

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
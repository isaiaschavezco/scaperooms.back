import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, In } from 'typeorm';
import { Article } from './article.entity';
import { Tag } from '../tag/tag.entity';
import { CreateArticleDTO, GetArticleList } from './article.dto';
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

    async findListArticles(isBiodermaGame: boolean): Promise<any> {
        try {
            let listToReturn = [];

            const articlesList = await this.articleRepository.find({
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

            console.log("createDTO: ", createDTO);

            const articleTags = await this.tagRepository.findByIds(createDTO.tags);

            let newArticle = this.articleRepository.create({
                title: createDTO.title,
                image: createDTO.image,
                content: createDTO.content,
                subtitle: createDTO.subtitle,
                galery: createDTO.galery,
                isBiodermaGame: createDTO.isBiodermaGame,
                tag: articleTags
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
            let query;

            if (getArticleList.filter) {

                const tagId = await this.tagRepository.findOne({
                    where: { name: getArticleList.filter.toUpperCase() }
                });

                console.log("tagId", tagId);

                if (!tagId) {

                    query = { isBiodermaGame: getArticleList.isBiodermaGame, title: Like(`%${getArticleList.filter}%`) };

                } else {

                    query = [
                        { isBiodermaGame: getArticleList.isBiodermaGame, title: Like(`%${getArticleList.filter}%`) },
                        { isBiodermaGame: getArticleList.isBiodermaGame, tag: { name: Like(`%${getArticleList.filter}%`) } }
                    ];

                }

            } else {
                query = { isBiodermaGame: getArticleList.isBiodermaGame };
            }

            // const articlesList = await this.articleRepository.find({
            //     relations: ["tag"],
            //     where: query,
            //     order: {
            //         createdAt: "DESC"
            //     },
            //     take: 15,
            //     skip: (getArticleList.page * 15)
            // });

            // const articleList2 = await this.articleRepository.createQueryBuilder("art")
            //     .distinct(true)
            //     .select(["art.id", "art.title", "art.tag"])
            //     .innerJoin("art.tag", "tag")// , "campaing.id = :campaingId", { campaingId: getQuizzesByUserCampaingDTO.campaingId }
            //     .where("(art.isBiodermaGame = :isBiodermaGame ) AND ( art.title LIKE :filter OR tag.name LIKE :tagFilter )", { isBiodermaGame: getArticleList.isBiodermaGame, filter: '%' + getArticleList.filter + '%', tagFilter: '%' + getArticleList.filter.toUpperCase() + '%' })
            //     .skip(getArticleList.page * 15)
            //     .take(15)
            //     .getMany();

            // articleList2.forEach(article => {
            //     listToReturn.push({
            //         id: article.id,
            //         title: article.title,
            //         subtitle: article.subtitle,
            //         date: moment(article.createdAt).format('DD/MMM/YYYY'),
            //         imageURL: article.image,
            //         tags: article.tag
            //     });
            // });

            return { blogs: listToReturn };
        } catch (err) {
            console.log("ArticleService - searchForArticlesList: ", err);

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error getting articles',
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
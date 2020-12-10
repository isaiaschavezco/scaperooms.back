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

        console.log(" getArticleList: ",getArticleList)

        const userTypeQuery =  getArticleList.type ? `AND (target.type = ${getArticleList.type})` :"";
        const stateQuery =  getArticleList.userState ? `AND (target.city = ${getArticleList.userState})` :"";
        const chainQuery =  getArticleList.userChain ? `AND (target.chain = ${getArticleList.userChain})` :"";
        const clinicQuery =  getArticleList.userClinic ? `AND (target.clinic = ${getArticleList.userClinic})` :"";
        const positionQuery =  getArticleList.userPosition ? `AND (target.position = ${getArticleList.userPosition})` :""

        const {type,userState,userChain,userClinic,userPosition} = getArticleList

        const positionQueryNull =  `AND (target.position = null)`
        const stateQueryNull = `AND (target.city = null)`
        const chainQueryNull = `AND (target.chain = null)`
        const clinicQueryNull = `AND (target.clinic = null)`
        const allUsersSpecificQuery = `AND (target.allUsers = true)`
        const targetNull = `AND (target = null)`

        // const allUsersSpecificQuery = `AND (target.allUsers = true)`
        const ArticlesToSend = []

       

        let whereStr = ""
        let whereState = ""
        let whereSecondary = ""
        let whereAllUsersSpecific = ""
        let restOfUsers = ""
        const pagesSkip = getArticleList.page
        const stringFilter = getArticleList.filter
        let mainStr = "(art.title LIKE :filter OR tag.name LIKE :tagFilter) AND (art.isBiodermaGame = false)"
        let whereAllUsers = "(art.isAll = true) AND ( art.title LIKE :filter OR tag.name LIKE :tagFilter )"
        try {

            if (getArticleList.isBiodermaGame) {
                whereStr = "(art.isBiodermaGame = true ) AND ( art.title LIKE :filter OR tag.name LIKE :tagFilter )";

                const allBioderma = await this.searchDB(whereStr,pagesSkip,stringFilter)
                return { blogs: [...allBioderma]};

            } else{
                if(getArticleList.type === 1){
                    let mainNaosStr = "AND (art.isBlogNaos = true)"
                    // whereStr = `${mainStr} ${mainNaosStr} ${userTypeQuery} ${stateQuery} ${positionQuery}`;
                    whereStr = `${mainStr} ${mainNaosStr} `;
                    const articlesWhereStr = await this.searchDB(whereStr,pagesSkip,stringFilter)
                    console.log("articlesWhereStr",articlesWhereStr)

                    articlesWhereStr.map(article =>{
                        if(article.isAll) 
                            ArticlesToSend.push(article)
                        else if(article.targets.length === 0)
                            ArticlesToSend.push(article)
                            else{
                                console.log("article.targets",article.targets);
                                console.log("article.targets[0]",article.targets[0]);
                                console.log("article.targets[0][0",article.targets[0][0]);

                                let target = article.targets[0] 

                                if(target.isAll)
                                ArticlesToSend.push(article)
                                else if(target.city && target.position)
                                {
                                    if(target.city.id === userState && target.position.id === userPosition)
                                        ArticlesToSend.push(article)
                                    }
                                else if(target.city && !target.position){
                                    if(target.city.id === userState)
                                        ArticlesToSend.push(article)
                                    }
                                    else if(!target.city && target.position)
                                    if(target.position.id === userPosition)
                                        ArticlesToSend.push(article)
                        }

                        
                    })

                    

                }
                // if(getArticleList.type === 2){

                //     let mainPharmaStr = "AND (art.isBlogNaos = false) AND (art.isBlogEsthederm = false) AND (art.isAll = false)"
                //     whereStr = `${mainStr} ${mainPharmaStr} ${userTypeQuery} ${stateQuery} ${chainQuery}`;
                //     whereState = ` ${mainStr} ${mainPharmaStr} ${userTypeQuery} ${stateQuery} ${chainQueryNull}`;
                //     whereSecondary = ` ${mainStr}${mainPharmaStr} ${userTypeQuery} ${stateQueryNull} ${chainQuery}`;
                //     whereAllUsersSpecific = `${mainStr} ${mainPharmaStr} ${userTypeQuery} ${allUsersSpecificQuery}`
                //     restOfUsers = `${mainStr} ${mainPharmaStr} ${targetNull}`
                // }
                // if(getArticleList.type === 3){
                //     let mainEstheStr = "AND (art.isBlogEsthederm = true)"
                //     whereStr = `${mainStr} ${mainEstheStr} ${userTypeQuery} ${stateQuery} ${clinicQuery}`;
                //     whereState = ` ${mainStr} ${mainEstheStr} ${userTypeQuery} ${stateQuery} ${clinicQueryNull}`;
                //     whereSecondary = `${mainStr} ${mainEstheStr} ${userTypeQuery} ${stateQueryNull} ${clinicQuery}`;
                //     whereAllUsersSpecific = `${mainStr} ${mainEstheStr} ${userTypeQuery} ${allUsersSpecificQuery}`
                //     restOfUsers = `${mainStr} ${mainEstheStr} ${targetNull}`
                // }
               
                // const articlesWhereStr = await this.searchDB(whereStr,pagesSkip,stringFilter)
                // const articlesWhereState = await this.searchDB(whereState,pagesSkip,stringFilter)
                // const articlesWhereSecondary = await this.searchDB(whereSecondary,pagesSkip,stringFilter)
                // const articlesWhereAllUsersSpecific = await this.searchDB(whereAllUsersSpecific,pagesSkip,stringFilter)
                // const articlesToAAAllUsers = await this.searchDB(whereAllUsers,pagesSkip,stringFilter)
                // const articlesToRestOfUsers = await this.searchDB(restOfUsers,pagesSkip,stringFilter)
                // console.log("articlesWhereStr",articlesWhereStr)
                // console.log("articlesWhereState",articlesWhereState)
                // console.log("articlesWhereSecondary",articlesWhereSecondary)
                // console.log("articlesWhereAllUsersSpecific",articlesWhereAllUsersSpecific)
                // console.log("articlesToAAAllUsers",articlesToAAAllUsers)
                // console.log("articlesToRestOfUsers",articlesToRestOfUsers)


                return { blogs: [...ArticlesToSend]
                        };
                }
        } catch (err) {
            console.log("ArticleService - searchForArticlesList: ", err);

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error getting articles',
            }, 500);
        }
    }


    async searchDB(whereString, pages, filter){
        let listToReturn = [];

        const Articles = await this.articleRepository.createQueryBuilder("art")
            .distinct(true)
                .select(["art.id", "art.title", "art.subtitle", "art.image", "art.createdAt","art.isAll","art.isBlogNaos","art.isBlogEsthederm"])
                .leftJoinAndSelect("art.tag", "tag")
                .leftJoinAndSelect("art.target", "target")
                .where(whereString, 
                    { 
                        filter: '%' + filter + '%',
                        tagFilter: '%' + filter.toUpperCase() + '%'
                    })
                .printSql()
                   //getArticleList.page 
                .skip(pages * 10)
                .take(10)
                .orderBy("art.createdAt", "DESC")
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
            return listToReturn
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
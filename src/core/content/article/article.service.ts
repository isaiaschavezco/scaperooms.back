import { Target } from './../../trivia/target/target.entity'
import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, Like, In } from 'typeorm'
import { Article } from './article.entity'
import { Tag } from '../tag/tag.entity'
import {
  CreateArticleDTO,
  GetArticleList,
  GetArticlesList,
  UpdateArticleDTO
} from './article.dto'
import * as moment from 'moment'

@Injectable()
export class ArticleService {
  constructor (
    @InjectRepository(Article) private articleRepository: Repository<Article>,
    @InjectRepository(Tag) private tagRepository: Repository<Tag>,
    @InjectRepository(Target) private targetRepository: Repository<Target>
  ) {}

  async findAll (): Promise<any> {
    try {
      const articlesList = await this.articleRepository.find({
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
      })
      return { blogs: articlesList }
    } catch (err) {
      console.log('ArticleService - findAll: ', err)

      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Error getting articles'
        },
        500
      )
    }
  }

  async findById (articleId: number): Promise<any> {
    try {
      let response = {}

      const articleToReturn = await this.articleRepository.findOne(articleId, {
        relations: [
          'tag',
          'target',
          'target.city',
          'target.chain',
          'target.clinic',
          'target.position',
          'target.type'
        ]
      })
      console.log('articleToReturn: ', articleToReturn)

      if (articleToReturn) {
        response = {
          title: articleToReturn.title,
          subtitle: articleToReturn.subtitle,
          date: moment(articleToReturn.createdAt).format('DD/MM/YYYY'),
          tags: articleToReturn.tag,
          images: JSON.parse(articleToReturn.galery),
          description: articleToReturn.content,
          targets: articleToReturn.target
        }
      }

      return {
        blogs: response
      }
    } catch (err) {
      console.log('ArticleService - findById: ', err)

      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Error getting articles'
        },
        500
      )
    }
  }

  async findListArticles (requestDTO: GetArticlesList): Promise<any> {
    try {
      let listToReturn = []
      console.log(requestDTO)
      const articlesList = await this.articleRepository.find({
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
      })

      articlesList.forEach(article => {
        listToReturn.push({
          id: article.id,
          title: article.title,
          createdAt: moment(article.createdAt).format('DD/MM/YYYY'),
          tags: article.tag,
          targets: article.target
        })
      })

      return { blogs: listToReturn }
    } catch (err) {
      console.log('ArticleService - findListArticles: ', err)

      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Error getting articles'
        },
        500
      )
    }
  }

  async createArticle (createDTO: CreateArticleDTO): Promise<any> {
    try {
      // console.log("createDTO: ", createDTO);

      const articleTags = await this.tagRepository.findByIds(createDTO.tags)

      const articleTargets = await this.targetRepository.findByIds(
        createDTO.targets,
        {
          relations: ['clinic', 'chain', 'position', 'type', 'delegation'] //<----probablemente sea city
        }
      )

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
      })

      await this.articleRepository.save(newArticle)

      return { status: 0 }
    } catch (err) {
      console.log('ArticleService - createArticle: ', err)

      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Error creating articles'
        },
        500
      )
    }
  }

  async searchForArticlesList (getArticleList: GetArticleList): Promise<any> {
    console.log(' getArticleList: ', getArticleList)
    const {
      type,
      userState,
      userChain,
      userClinic,
      userPosition
    } = getArticleList
    // console.log("type,userState,userChain,userClinic,userPosition",type,userState,userChain,userClinic,userPosition);

    const relations = ['city', 'chain', 'position', 'type', 'delegation']

    const ArticlesToSend = []
    let whereStr = ''
    const pagesSkip = getArticleList.page
    const stringFilter = getArticleList.filter
    let mainStr =
      '(art.title LIKE :filter OR tag.name LIKE :tagFilter) AND (art.isBiodermaGame = false)'
    let whereAllUsers =
      '(art.isAll = true) AND ( art.title LIKE :filter OR tag.name LIKE :tagFilter )'

    try {
      if (getArticleList.isBiodermaGame) {
        whereStr =
          '(art.isBiodermaGame = true ) AND ( art.title LIKE :filter OR tag.name LIKE :tagFilter )'

        const allBioderma = await this.searchDB(
          whereStr,
          pagesSkip,
          stringFilter
        )
        return { blogs: [...allBioderma] }
      } else {
        if (type === 1) {
          const mainNaosStr = 'AND (art.isBlogNaos = true)'
          whereStr = `${mainStr} ${mainNaosStr} `
          const articlesWhereStr = await this.searchDB(
            whereStr,
            pagesSkip,
            stringFilter
          )
          await Promise.all(
            articlesWhereStr.map(async article => {
              if (article.isAll) ArticlesToSend.push(article)
              else if (article.targets.length === 0)
                ArticlesToSend.push(article)
              else {
                const articleTargets = await this.targetRepository.findByIds(
                  article.targets,
                  { relations }
                )

                articleTargets.forEach(target => {
                  if (target.allUsers) ArticlesToSend.unshift(article)
                  else if (target.position !== null && target.city !== null) {
                    if (
                      target.city.id === userState &&
                      target.position.id === userPosition
                    ) {
                      ArticlesToSend.unshift(article)
                    }
                  } else if (target.city !== null) {
                    if (target.city.id === userState) {
                      ArticlesToSend.unshift(article)
                    }
                  } else if (target.position !== null) {
                    if (target.position.id === userPosition) {
                      ArticlesToSend.unshift(article)
                    }
                  }
                })
              }
            })
          )
        }
        if (type === 2) {
          const mainPharmaStr =
            'AND (art.isBlogNaos = false) AND (art.isBlogEsthederm = false) AND (art.isAll = false)'
          whereStr = `${mainStr} ${mainPharmaStr}`

          const articlesWhereStr = await this.searchDB(
            whereStr,
            pagesSkip,
            stringFilter
          )
          await Promise.all(
            articlesWhereStr.map(async article => {
              if (article.isAll) ArticlesToSend.unshift(article)
              else if (article.targets.length === 0)
                ArticlesToSend.push(article)
              else {
                const articleTargets = await this.targetRepository.findByIds(
                  article.targets,
                  {
                    relations
                  }
                )
                articleTargets.forEach(target => {
                  const { allUsers, chain, city } = target

                  if (allUsers) ArticlesToSend.unshift(article)
                  else if (chain !== null && city !== null) {
                    if (city.id === userState && chain.id === userChain) {
                      ArticlesToSend.unshift(article)
                    }
                  } else if (city !== null && city.id === userState) {
                    ArticlesToSend.unshift(article)
                  } else if (chain !== null && chain.id === userChain) {
                    ArticlesToSend.unshift(article)
                  }
                })
              }
            })
          )
        }
        if (type === 3) {
          let mainEstheStr = 'AND (art.isBlogEsthederm = true)'
          whereStr = `${mainStr} ${mainEstheStr}`

          const articlesWhereStr = await this.searchDB(
            whereStr,
            pagesSkip,
            stringFilter
          )
          await Promise.all(
            articlesWhereStr.map(async article => {
              if (article.isAll) ArticlesToSend.unshift(article)
              else if (article.targets.length === 0)
                ArticlesToSend.push(article)
              else {
                const articleTargets = await this.targetRepository.findByIds(
                  article.targets,
                  {
                    relations
                  }
                )
                articleTargets.forEach(target => {
                  if (target.allUsers) ArticlesToSend.push(article)
                  else if (target.clinic !== null && target.city !== null) {
                    if (
                      target.city.id === userState &&
                      target.clinic.id === userClinic
                    ) {
                      ArticlesToSend.unshift(article)
                    }
                  } else if (
                    target.city !== null &&
                    target.city.id === userState
                  ) {
                    ArticlesToSend.unshift(article)
                  } else if (
                    target.clinic !== null &&
                    target.clinic.id === userClinic
                  ) {
                    ArticlesToSend.unshift(article)
                  }
                })
              }
            })
          )
        }

        const articlesToAAAllUsers = await this.searchDB(
          whereAllUsers,
          pagesSkip,
          stringFilter
        )
        console.log(articlesToAAAllUsers,ArticlesToSend)
        const allBlogs = [...articlesToAAAllUsers,...ArticlesToSend]
        const allBlogsOrd = allBlogs.sort(function(a,b){
          if(a.id > b.id) return -1
          if(a.id < b.id) return 1
        })


        return { blogs:allBlogsOrd }
      }
    } catch (err) {
      console.log('ArticleService - searchForArticlesList: ', err)

      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Error getting articles'
        },
        500
      )
    }
  }

  async searchDB (whereString, pages, filter) {
    let listToReturn = []

    const Articles = await this.articleRepository
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
      //getArticleList.page
      .skip(pages * 10)
      .take(10)
      .orderBy('art.createdAt', 'DESC')
      .getMany()
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
      })
    })
    return listToReturn
  }

  async searchOnFilter (target, specialField, compare, article, userState) {
    const ArticlesToSend = []
    if (target.allUsers) ArticlesToSend.push(article)
    else if (specialField !== null && target.city !== null) {
      if (target.city.id === userState && specialField.id === compare) {
        ArticlesToSend.push(article)
      }
    } else if (target.city !== null && target.city.id === userState) {
      ArticlesToSend.push(article)
    } else if (specialField !== null && specialField.id === compare) {
      ArticlesToSend.push(article)
    }
    return ArticlesToSend
  }
  async deleteArticle (articleId: number): Promise<any> {
    try {
      const articleToDelete = await this.articleRepository.findOne(articleId, {
        relations: ['tag', 'target']
      })

      await this.articleRepository.remove(articleToDelete)

      return { status: 0 }
    } catch (err) {
      console.log('ArticleService - deleteArticle: ', err)

      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Error removing article'
        },
        500
      )
    }
  }

  async update (updateDTO: UpdateArticleDTO): Promise<any> {
    try {
      console.log(updateDTO)
      const articleTags = await this.tagRepository.findByIds(updateDTO.tags)
     

      let articleToUpdate = await this.articleRepository.findOne(updateDTO.id)

      articleToUpdate.galery = updateDTO.galery
      articleToUpdate.subtitle = updateDTO.subtitle
      articleToUpdate.content = updateDTO.content
      articleToUpdate.tag = articleTags
      console.log("articleToUpdate",articleToUpdate)
      if (updateDTO.repost) {
      articleToUpdate.createdAt= moment().format('DD/MM/YYYY')        
      console.log("articleToUpdate.createdAt",articleToUpdate.createdAt)
      }

      await this.articleRepository.save(articleToUpdate)

      return { status: 0 }
    } catch (err) {
      console.log('ArticleService - update: ', err)

      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Error updating article'
        },
        500
      )
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

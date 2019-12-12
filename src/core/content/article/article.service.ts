import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './article.entity';
import { Tag } from '../tag/tag.entity';
import { CreateArticleDTO } from './article.dto';

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

    async createArticle(createDTO: CreateArticleDTO): Promise<any> {
        try {

            const articleTags = await this.tagRepository.findByIds(createDTO.tags);

            let newArticle = this.articleRepository.create({
                title: createDTO.title,
                image: createDTO.image,
                content: createDTO.content,
                subtitle: createDTO.subtitle,
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
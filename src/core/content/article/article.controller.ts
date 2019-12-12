import { Controller, Body, Get, Post, Delete, Param } from '@nestjs/common';
import { ArticleService } from './article.service';
import { Article } from './article.entity';
import { CreateArticleDTO } from './article.dto';

@Controller('article')
export class ArticleController {

    constructor(private articleService: ArticleService) { }

    @Get()
    async findAllArticles(): Promise<any> {
        return await this.articleService.findAll();
    }

    @Post()
    async createArticle(createArticleDTO: CreateArticleDTO): Promise<any> {
        return await this.articleService.createArticle(createArticleDTO);
    }

    // @Get(':id')
    // async findStateById(@Param('id') id): Promise<any> {
    //     return await this.cityService.findStateById(id);
    // }

}

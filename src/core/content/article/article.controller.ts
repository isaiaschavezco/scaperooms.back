import { Controller, Body, Get, Post, Delete, Param } from '@nestjs/common';
import { ArticleService } from './article.service';
import { Article } from './article.entity';

@Controller('article')
export class ArticleController {

    constructor(private articleService: ArticleService) { }

    @Get()
    async findAllArticles(): Promise<any> {
        return await this.articleService.findAll();
    }

    // @Get(':id')
    // async findStateById(@Param('id') id): Promise<any> {
    //     return await this.cityService.findStateById(id);
    // }

}

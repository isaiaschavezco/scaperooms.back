import { Controller, Body, Get, Post, Delete, Param } from '@nestjs/common';
import { ArticleService } from './article.service';
import { Article } from './article.entity';
import { CreateArticleDTO, GetArticleList } from './article.dto';

@Controller('article')
export class ArticleController {

    constructor(private articleService: ArticleService) { }

    @Get()
    async findAllArticles(): Promise<any> {
        return await this.articleService.findAll();
    }

    @Get(':id')
    async findArticleById(@Param('id') id): Promise<any> {
        return await this.articleService.findById(id);
    }

    @Get('list/:isBiodermaGame')
    async findArticlesList(@Param('isBiodermaGame') isBiodermaGame): Promise<any> {
        return await this.articleService.findListArticles(isBiodermaGame);
    }

    @Post()
    async createArticle(@Body() createArticleDTO: CreateArticleDTO): Promise<any> {
        return await this.articleService.createArticle(createArticleDTO);
    }

    @Post('user')
    async getArticlesByUser(@Body() getArticleList: GetArticleList): Promise<any> {
        return await this.articleService.searchForArticlesList(getArticleList);
    }

    // @Get(':id')
    // async findStateById(@Param('id') id): Promise<any> {
    //     return await this.cityService.findStateById(id);
    // }

}

import { ArticleService } from './article.service';
import { CreateArticleDTO } from './article.dto';
export declare class ArticleController {
    private articleService;
    constructor(articleService: ArticleService);
    findAllArticles(): Promise<any>;
    createArticle(createArticleDTO: CreateArticleDTO): Promise<any>;
}

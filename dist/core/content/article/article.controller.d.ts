import { ArticleService } from './article.service';
import { CreateArticleDTO, GetArticleList } from './article.dto';
export declare class ArticleController {
    private articleService;
    constructor(articleService: ArticleService);
    findAllArticles(): Promise<any>;
    findArticleById(id: any): Promise<any>;
    findArticlesList(isBiodermaGame: any): Promise<any>;
    createArticle(createArticleDTO: CreateArticleDTO): Promise<any>;
    getArticlesByUser(getArticleList: GetArticleList): Promise<any>;
}

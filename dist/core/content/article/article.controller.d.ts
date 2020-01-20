import { ArticleService } from './article.service';
import { CreateArticleDTO, GetArticleList, GetArticlesList, UpdateArticleDTO } from './article.dto';
export declare class ArticleController {
    private articleService;
    constructor(articleService: ArticleService);
    findAllArticles(): Promise<any>;
    findArticleById(id: any): Promise<any>;
    deleteArticle(id: any): Promise<any>;
    findArticlesList(getArticlesList: GetArticlesList): Promise<any>;
    createArticle(createArticleDTO: CreateArticleDTO): Promise<any>;
    updateArticle(updateArticleDTO: UpdateArticleDTO): Promise<any>;
    getArticlesByUser(getArticleList: GetArticleList): Promise<any>;
}

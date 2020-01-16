import { Repository } from 'typeorm';
import { Article } from './article.entity';
import { Tag } from '../tag/tag.entity';
import { CreateArticleDTO, GetArticleList, GetArticlesList } from './article.dto';
export declare class ArticleService {
    private articleRepository;
    private tagRepository;
    constructor(articleRepository: Repository<Article>, tagRepository: Repository<Tag>);
    findAll(): Promise<any>;
    findById(articleId: number): Promise<any>;
    findListArticles(requestDTO: GetArticlesList): Promise<any>;
    createArticle(createDTO: CreateArticleDTO): Promise<any>;
    searchForArticlesList(getArticleList: GetArticleList): Promise<any>;
    deleteArticle(articleId: number): Promise<any>;
}

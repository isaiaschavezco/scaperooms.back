import { Repository } from 'typeorm';
import { Article } from './article.entity';
import { Tag } from '../tag/tag.entity';
import { CreateArticleDTO } from './article.dto';
export declare class ArticleService {
    private articleRepository;
    private tagRepository;
    constructor(articleRepository: Repository<Article>, tagRepository: Repository<Tag>);
    findAll(): Promise<any>;
    findListArticles(isBiodermaGame: boolean): Promise<any>;
    createArticle(createDTO: CreateArticleDTO): Promise<any>;
}

import { Repository } from 'typeorm';
import { Article } from './article.entity';
export declare class ArticleService {
    private articleRepository;
    constructor(articleRepository: Repository<Article>);
    findAll(): Promise<any>;
}

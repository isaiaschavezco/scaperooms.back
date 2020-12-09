import { Target } from './../../trivia/target/target.entity';
import { Repository } from 'typeorm';
import { Article } from './article.entity';
import { Tag } from '../tag/tag.entity';
import { CreateArticleDTO, GetArticleList, GetArticlesList, UpdateArticleDTO } from './article.dto';
export declare class ArticleService {
    private articleRepository;
    private tagRepository;
    private targetRepository;
    constructor(articleRepository: Repository<Article>, tagRepository: Repository<Tag>, targetRepository: Repository<Target>);
    findAll(): Promise<any>;
    findById(articleId: number): Promise<any>;
    findListArticles(requestDTO: GetArticlesList): Promise<any>;
    createArticle(createDTO: CreateArticleDTO): Promise<any>;
    searchForArticlesList(getArticleList: GetArticleList): Promise<any>;
    deleteArticle(articleId: number): Promise<any>;
    update(updateDTO: UpdateArticleDTO): Promise<any>;
}

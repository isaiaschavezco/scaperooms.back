import { Tag } from '../tag/tag.entity';
export declare class Article {
    id: number;
    title: string;
    image: string;
    description: string;
    content: string;
    createdAt: Date;
    tag: Tag[];
}

import { Tag } from '../tag/tag.entity';
export declare class Article {
    id: number;
    title: string;
    image: string;
    subtitle: string;
    content: string;
    isBiodermaGame: boolean;
    createdAt: Date;
    tag: Tag[];
}

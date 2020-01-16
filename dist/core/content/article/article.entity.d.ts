import { Tag } from '../tag/tag.entity';
export declare class Article {
    id: number;
    title: string;
    image: string;
    subtitle: string;
    galery: string;
    content: string;
    isBiodermaGame: boolean;
    isBlogNaos: boolean;
    createdAt: Date;
    tag: Tag[];
}

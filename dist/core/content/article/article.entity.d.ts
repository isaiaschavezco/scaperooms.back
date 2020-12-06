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
    isBlogEsthederm: boolean;
    createdAt: Date;
    tag: Tag[];
}

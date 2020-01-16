export declare class CreateArticleDTO {
    readonly title: string;
    readonly image: string;
    readonly subtitle: string;
    readonly content: string;
    readonly galery: string;
    readonly isBiodermaGame: boolean;
    readonly tags: number[];
    readonly isBlogNaos: boolean;
}
export declare class GetArticleList {
    readonly isBiodermaGame: boolean;
    readonly page: number;
    readonly filter: string;
}
export declare class GetArticlesList {
    readonly isBiodermaGame: boolean;
    readonly isBlogNaos: boolean;
}

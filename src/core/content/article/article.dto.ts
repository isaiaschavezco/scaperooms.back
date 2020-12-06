export class CreateArticleDTO {
    readonly title: string;
    readonly image: string;
    readonly subtitle: string;
    readonly content: string;
    readonly galery: string;
    readonly isBiodermaGame: boolean;
    readonly tags: number[];
    readonly isBlogNaos: boolean;
    readonly isBlogEsthederm: boolean;
    
}

export class GetArticleList {
    readonly isBiodermaGame: boolean;
    readonly page: number;
    readonly filter: string;
    readonly type: number;
}

export class GetArticlesList {
    readonly isBiodermaGame: boolean;
    readonly isBlogNaos: boolean;
    readonly isBlogEsthederm: boolean;
}

export class UpdateArticleDTO {
    readonly id: number;
    readonly galery: string;
    readonly subtitle: string;
    readonly content: string;
    readonly tags: number[];
}
export class CreateArticleDTO {
    readonly title: string;
    readonly image: string;
    readonly subtitle: string;
    readonly content: string;
    readonly galery: string;
    readonly isBiodermaGame: boolean;
    readonly tags: number[];
    readonly isBlogNaos: boolean;
}

export class GetArticleList {
    readonly isBiodermaGame: boolean;
    readonly page: number;
    readonly filter: string;
}

export class GetArticlesList {
    readonly isBiodermaGame: boolean;
    readonly isBlogNaos: boolean;
}


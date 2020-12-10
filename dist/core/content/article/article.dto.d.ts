export declare class CreateArticleDTO {
    readonly title: string;
    readonly image: string;
    readonly subtitle: string;
    readonly content: string;
    readonly galery: string;
    readonly isBiodermaGame: boolean;
    readonly tags: number[];
    readonly isBlogNaos: boolean;
    readonly isBlogEsthederm: boolean;
    readonly isAll: boolean;
    readonly targets: number[];
}
export declare class UpdateArticleDTO {
    readonly id: number;
    readonly galery: string;
    readonly subtitle: string;
    readonly content: string;
    readonly tags: number[];
    readonly targets: number[];
}
export declare class GetArticleList {
    readonly isBiodermaGame: boolean;
    readonly page: number;
    readonly filter: string;
    readonly type: number;
    readonly userState: number;
    readonly userPosition: number;
    readonly userChain: number;
    readonly userClinic: number;
}
export declare class GetArticlesList {
    readonly isBiodermaGame: boolean;
    readonly isBlogNaos: boolean;
    readonly isBlogEsthederm: boolean;
    readonly isAll: boolean;
}

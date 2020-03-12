export declare class CreateCampaingDTO {
    readonly name: string;
    readonly portrait: string;
    readonly isBiodermaGame: boolean;
    readonly targets: number[];
}
export declare class UpdateCampaingDTO {
    readonly campaingId: number;
    readonly name: string;
}
export declare class GetCampaingsByUserDTO {
    readonly email: string;
    readonly isBiodermaGame: boolean;
}
export declare class GetUserCampaingHistory {
    readonly email: string;
    readonly page: number;
}
export declare class RemoveCampaingDTO {
    readonly email: string;
    readonly password: string;
    readonly campaingId: number;
}

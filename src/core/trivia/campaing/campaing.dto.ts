export class CreateCampaingDTO {
    readonly name: string;
    readonly portrait: string;
    readonly isBiodermaGame: boolean;
    readonly targets: number[];
}

export class UpdateCampaingDTO {
    readonly campaingId: number;
    readonly name: string;
}

export class GetCampaingsByUserDTO {
    readonly email: string;
    readonly isBiodermaGame: boolean;
}

export class GetUserCampaingHistory {
    readonly email: string;
    readonly page: number;
}

export class RemoveCampaingDTO {
    readonly email: string;
    readonly password: string;
    readonly campaingId: number;
}
export class CreateTargetDTO {
    readonly allUsers: boolean;
    readonly userType: number;
    readonly state: number;
    readonly chain: number;
    readonly naosPosition: number;
    readonly initAge: number;
    readonly finalAge: number;
    readonly gender: number;
}

export class DeleteTargetDTO {
    readonly targetId: number;
}
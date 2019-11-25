export class InviteUserDTO {
    readonly email: string;
    readonly type: number;
}

export class CreateUserDTO {
    readonly name: string;
    readonly lastName: string;
    readonly birthDate: string;
    readonly gender: boolean;
    readonly state: number;
    readonly phone: string;
    readonly email: string;
    readonly password: string;
}

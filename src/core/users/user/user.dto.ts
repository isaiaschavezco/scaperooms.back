export class InviteUserDTO {
    readonly email: string;
    readonly type: number;
}

export class CreateUserDTO {
    readonly name: string;
    readonly lastName: string;
    readonly photo: string;
    readonly nickname: string;
    readonly birthDate: string;
    readonly gender: boolean;
    readonly phone: string;
    readonly email: string;
    readonly drugStore: string;
    readonly password: string;
    readonly state: number;
    readonly city: number;
    readonly mayoralty: number;
}

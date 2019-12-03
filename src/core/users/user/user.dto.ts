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
    readonly chain: number;
}

export class CreateNAOSUserDTO {
    readonly name: string;
    readonly lastName: string;
    readonly photo: string;
    readonly birthDate: string;
    readonly gender: boolean;
    readonly phone: string;
    readonly email: string;
    readonly password: string;
    readonly postalCode: string;
    readonly state: number;
    readonly city: number;
    readonly naosPosition: number;
}

export class CreateDrugStoreUserDTO {
    readonly name: string;
    readonly lastName: string;
    readonly photo: string;
    readonly birthDate: string;
    readonly gender: boolean;
    readonly phone: string;
    readonly email: string;
    readonly password: string;
    readonly postalCode: string;
    readonly state: number;
    readonly city: number;
    readonly chain: number;
    readonly drugStore: string;
    readonly town: string;
    readonly mayoralty: string;
    readonly charge: string;
}

export class UpdateNAOSUserDTO {
    readonly userId: number;
    readonly name: string;
    readonly lastName: string;
    readonly photo: string;
    readonly birthDate: string;
    readonly gender: boolean;
    readonly phone: string;
    readonly password: string;
    readonly postalCode: string;
    readonly state: number;
    readonly city: number;
    readonly naosPosition: number;
}

export class UpdateDrugStoreUserDTO {
    readonly userId: number;
    readonly name: string;
    readonly lastName: string;
    readonly photo: string;
    readonly birthDate: string;
    readonly gender: boolean;
    readonly phone: string;
    readonly password: string;
    readonly postalCode: string;
    readonly state: number;
    readonly city: number;
    readonly chain: number;
    readonly drugStore: string;
    readonly town: string;
    readonly mayoralty: string;
    readonly charge: string;
}
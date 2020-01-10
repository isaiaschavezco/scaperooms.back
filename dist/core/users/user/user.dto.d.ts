export declare class InviteUserDTO {
    readonly email: string;
    readonly type: number;
}
export declare class CreateUserDTO {
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
export declare class CreateNAOSUserDTO {
    readonly name: string;
    readonly lastName: string;
    readonly nickName: string;
    readonly photo: string;
    readonly birthDate: string;
    readonly gender: boolean;
    readonly phone: string;
    readonly email: string;
    readonly password: string;
    readonly state: number;
    readonly city: number;
    readonly naosPosition: number;
}
export declare class CreateDrugStoreUserDTO {
    readonly name: string;
    readonly lastName: string;
    readonly nickName: string;
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
export declare class UpdateNAOSUserDTO {
    readonly userId: string;
    readonly name: string;
    readonly lastName: string;
    readonly nickName: string;
    readonly photo: string;
    readonly birthDate: string;
    readonly gender: boolean;
    readonly phone: string;
    readonly state: number;
    readonly city: number;
    readonly naosPosition: number;
}
export declare class UpdateDrugStoreUserDTO {
    readonly userId: number;
    readonly name: string;
    readonly lastName: string;
    readonly nickName: string;
    readonly photo: string;
    readonly birthDate: string;
    readonly gender: boolean;
    readonly phone: string;
    readonly postalCode: string;
    readonly state: number;
    readonly city: number;
    readonly chain: number;
    readonly drugStore: string;
    readonly town: string;
    readonly mayoralty: string;
    readonly charge: string;
}
export declare class ResetPassword {
    readonly email: string;
}

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
    readonly clinic: number;

}

export class CreateNAOSUserDTO {
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
    readonly userToken: string;
}

export class CreateDrugStoreUserDTO {
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
    readonly userToken: string;
}

export class UpdateNAOSUserDTO {
    readonly userId: string;
    readonly name: string;
    readonly lastName: string;
    readonly nickname: string;
    readonly photo: string;
    readonly birthDate: string;
    readonly gender: boolean;
    readonly phone: string;
    readonly state: number;
    readonly city: number;
    readonly naosPosition: number;
}

export class UpdateDrugStoreUserDTO {
    readonly userId: number;
    readonly name: string;
    readonly lastName: string;
    readonly nickname: string;
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

export class ResetPassword {
    readonly email: string;
}

export class ConfirmUserPassword {
    readonly email: string;
    readonly password: string;
}

export class PasswordRecovery {
    readonly email: string;
    readonly password: string;
    readonly token: string;
}
// -------


export class CreateEsthedermUserDTO {
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
    readonly clinic: number;
    readonly town: string;
    readonly mayoralty: string;
    readonly charge: string;
    readonly userToken: string;
}


// ----

// -----------

export class UpdateEsthedermUserDTO {
    readonly userId: number;
    readonly name: string;
    readonly lastName: string;
    readonly nickname: string;
    readonly photo: string;
    readonly birthDate: string;
    readonly gender: boolean;
    readonly phone: string;
    readonly postalCode: string;
    readonly state: number;
    readonly city: number;
    readonly clinic: number;
    readonly town: string;
    readonly mayoralty: string;
    readonly charge: string;
}
// -----------


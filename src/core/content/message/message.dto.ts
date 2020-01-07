export class StartConversationDTO {
    readonly email: string;
}

export class CreateMessageDTO {
    readonly email: string;
    readonly data: string;
}

export class CreateAdminMessageDTO {
    readonly data: string;
    readonly userEmail: string;
}
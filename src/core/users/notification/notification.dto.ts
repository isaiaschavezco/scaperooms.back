export class CreateNotificationDTO {
    readonly email: string;
    readonly password: string;
    readonly title: string;
    readonly content: string;
    readonly targets: number[];
}
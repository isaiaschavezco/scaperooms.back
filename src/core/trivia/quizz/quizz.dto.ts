export class CreateQuizzDTO {
    readonly campaingId: number;
    readonly name: string;
}

export class SendQuizzDTO {
    readonly quizzId: number;
    readonly startDate: string;
    readonly finishDate: string;
}
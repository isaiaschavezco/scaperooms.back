export class CreateQuizzDTO {
    readonly campaingId: number;
    readonly name: string;
}

export class SendQuizzDTO {
    readonly quizzId: number;
    readonly startDate: string;
    readonly finishDate: string;
}

export class QuizzListDTO {
    quizzId: number;
    name: string;
    createdAt: string;
    startedAt: string;
    finishedAt: string;
    isActive: boolean;
    isDeleted: boolean;
    isSend: boolean;
    points: number;
}

export class GetQuizzesByUserCampaingDTO {
    readonly email: string;
    readonly campaingId: number;
}
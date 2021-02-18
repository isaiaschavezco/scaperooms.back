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
    questions: number;
    points: number;
}

export class GetQuizzesByUserCampaingDTO {
    readonly email: string;
    readonly campaingId: number;
}

export class RemoveQuizzDTO {
    readonly email: string;
    readonly password: string;
    readonly quizzId: number;
}

export class RemoveQuizzUserDTO {
    readonly id: number;
    readonly email: string;
    readonly password: string;
    readonly quizzId: number;
    readonly quizz: number;
}
export declare class CreateQuizzDTO {
    readonly campaingId: number;
    readonly name: string;
}
export declare class SendQuizzDTO {
    readonly quizzId: number;
    readonly startDate: string;
    readonly finishDate: string;
}
export declare class QuizzListDTO {
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
export declare class GetQuizzesByUserCampaingDTO {
    readonly email: string;
    readonly campaingId: number;
}
export declare class RemoveQuizzDTO {
    readonly email: string;
    readonly password: string;
    readonly quizzId: number;
}

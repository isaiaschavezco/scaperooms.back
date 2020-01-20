export class CreateQuestionDTO {
    readonly content: string;
    readonly answer: string;
    readonly points: number;
    readonly time: number;
    readonly questionType: number;
    readonly quizzId: number;
}

export class UpdateQuestionDTO {
    readonly id: number;
    readonly content: string;
    readonly answer: string;
    readonly points: number;
    readonly time: number;
    readonly questionType: number;
    readonly quizzId: number;
}
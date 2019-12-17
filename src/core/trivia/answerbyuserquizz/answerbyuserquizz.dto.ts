export class SetUserAnswers {
    readonly email: string;
    readonly id: number;
    readonly points: number;
    readonly answers: any;
}

export class SetUserAnswersByQuestion {
    readonly email: string;
    readonly points: number;
    readonly quizzId: number;
    readonly questionId: number;
    readonly userResponse: any;
    readonly isFirstQuestion: boolean;
    readonly isLastQuestion: boolean;
}
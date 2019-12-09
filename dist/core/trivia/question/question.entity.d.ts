import { Quizz } from '../quizz/quizz.entity';
import { QuestionType } from '../question-type/question-type.entity';
export declare class Question {
    id: number;
    content: string;
    answer: string;
    points: number;
    time: number;
    createdAt: Date;
    question_type: QuestionType;
    quizz: Quizz;
}

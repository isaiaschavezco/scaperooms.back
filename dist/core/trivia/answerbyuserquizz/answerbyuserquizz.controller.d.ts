import { AnswerbyuserquizzService } from './answerbyuserquizz.service';
import { SetUserAnswers, SetUserAnswersByQuestion } from './answerbyuserquizz.dto';
export declare class AnswerbyuserquizzController {
    private AnswerbyuserquizzService;
    constructor(AnswerbyuserquizzService: AnswerbyuserquizzService);
    setUserAnswers(setUserAnswers: SetUserAnswers): Promise<any>;
    setUserAnswersByquestion(setUserAnswersByQuestion: SetUserAnswersByQuestion): Promise<any>;
}

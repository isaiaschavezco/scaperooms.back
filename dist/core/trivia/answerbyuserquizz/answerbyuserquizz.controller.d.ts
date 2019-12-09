import { AnswerbyuserquizzService } from './answerbyuserquizz.service';
import { SetUserAnswers } from './answerbyuserquizz.dto';
export declare class AnswerbyuserquizzController {
    private AnswerbyuserquizzService;
    constructor(AnswerbyuserquizzService: AnswerbyuserquizzService);
    setUserAnswers(setUserAnswers: SetUserAnswers): Promise<any>;
}

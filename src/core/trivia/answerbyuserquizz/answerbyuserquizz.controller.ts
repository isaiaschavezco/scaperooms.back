import { Controller, Body, Get, Post, Delete, Param } from '@nestjs/common';
import { AnswerbyuserquizzService } from './answerbyuserquizz.service';
import { Answerbyuserquizz } from './answerbyuserquizz.entity';
import { SetUserAnswers, SetUserAnswersByQuestion } from './answerbyuserquizz.dto';

@Controller('answerbyuserquizz')
export class AnswerbyuserquizzController {

    constructor(private AnswerbyuserquizzService: AnswerbyuserquizzService) { }

    @Post()
    async setUserAnswers(@Body() setUserAnswers: SetUserAnswers): Promise<any> {
        return await this.AnswerbyuserquizzService.setUserAnswer(setUserAnswers);
    }

    @Post('question')
    async setUserAnswersByquestion(@Body() setUserAnswersByQuestion: SetUserAnswersByQuestion): Promise<any> {
        return await this.AnswerbyuserquizzService.setUserAnswerByquestion(setUserAnswersByQuestion);
    }

    // @Get(':id')
    // async findStateById(@Param('id') id): Promise<any> {
    //     return await this.cityService.findStateById(id);
    // }

}
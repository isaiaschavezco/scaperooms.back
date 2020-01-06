import { Controller, Body, Get, Post, Delete, Param } from '@nestjs/common';
import { MessageService } from './message.service';
import { StartConversationDTO } from './message.dto';

@Controller('message')
export class MessageController {

    constructor(private messageService: MessageService) { }

    @Post('user/start')
    async setUserAnswers(@Body() setUserAnswers: SetUserAnswers): Promise<any> {
        return await this.AnswerbyuserquizzService.setUserAnswer(setUserAnswers);
    }

    // @Post('question')
    // async setUserAnswersByquestion(@Body() setUserAnswersByQuestion: SetUserAnswersByQuestion): Promise<any> {
    //     return await this.AnswerbyuserquizzService.setUserAnswerByquestion(setUserAnswersByQuestion);
    // }

    // @Get(':id')
    // async findStateById(@Param('id') id): Promise<any> {
    //     return await this.cityService.findStateById(id);
    // }

}
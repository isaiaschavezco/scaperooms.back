import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { QuizzService } from './quizz.service';
import { Quizz } from './quizz.entity';
import { CreateQuizzDTO, SendQuizzDTO } from './quizz.dto';

@Controller('quizz')
export class QuizzController {

    constructor(private quizzService: QuizzService) { }

    @Get()
    async getAllQuizzes(): Promise<Quizz[]> {
        return await this.quizzService.findAll();
    }

    @Get(':campaingId')
    async getAllByCampaing(@Param('campaingId') campaingId): Promise<Quizz[]> {
        return await this.quizzService.findAllByCampaing(campaingId);
    }

    @Post()
    async createQuizz(@Body() createQuizzDTO: CreateQuizzDTO): Promise<any> {
        return await this.quizzService.create(createQuizzDTO);
    }

    @Post('send')
    async sendQuizz(@Body() sendQuizzDTO: SendQuizzDTO): Promise<any> {
        return await this.quizzService.send(sendQuizzDTO);
    }

}
import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { QuizzService } from './quizz.service';
import { Quizz } from './quizz.entity';
import { CreateQuizzDTO, SendQuizzDTO, QuizzListDTO, GetQuizzesByUserCampaingDTO, RemoveQuizzDTO } from './quizz.dto';

@Controller('quizz')
export class QuizzController {

    constructor(private quizzService: QuizzService) { }

    @Get()
    async getAllQuizzes(): Promise<Quizz[]> {
        return await this.quizzService.findAll();
    }

    @Get('report/:quizzId')
    async getCampaingReport(@Param('quizzId') quizzId): Promise<any> {
        return await this.quizzService.generateQuizzReport(quizzId);
    }

    @Get(':campaingId')
    async getAllByCampaing(@Param('campaingId') campaingId): Promise<QuizzListDTO[]> {
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

    @Post('user')
    async getQuizzesByUserCampaing(@Body() getQuizzesByUserCampaingDTO: GetQuizzesByUserCampaingDTO): Promise<any> {
        return await this.quizzService.findQuizzesByUserCampaing(getQuizzesByUserCampaingDTO);
    }

    @Put('remove')
    async deleteQuizz(@Body() removeQuizzDTO: RemoveQuizzDTO): Promise<any> {
        return await this.quizzService.delete(removeQuizzDTO);
    }

}

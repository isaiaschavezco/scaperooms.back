import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { QuestionService } from './question.service';
import { Question } from './question.entity';
// import { CreateQuizzDTO } from './quizz.dto';

@Controller('question')
export class QuestionController {

    constructor(private questionService: QuestionService) { }

    @Get()
    async getAllQuizzes(): Promise<Question[]> {
        return await this.questionService.findAll();
    }

    // @Get(':campaingId')
    // async getAllByCampaing(@Param('campaingId') campaingId): Promise<Quizz[]> {
    //     return await this.quizzService.findAllByCampaing(campaingId);
    // }

    // @Post()
    // async createQuizz(@Body() createQuizzDTO: CreateQuizzDTO): Promise<any> {
    //     return await this.quizzService.create(createQuizzDTO);
    // }

}
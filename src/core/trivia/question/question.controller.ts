import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { QuestionService } from './question.service';
import { Question } from './question.entity';
import { CreateQuestionDTO } from './question.dto';

@Controller('question')
export class QuestionController {

    constructor(private questionService: QuestionService) { }

    @Get()
    async getAllQuizzes(): Promise<Question[]> {
        return await this.questionService.findAll();
    }

    @Get(':quizzId')
    async getAllByCampaing(@Param('quizzId') quizzId): Promise<Question[]> {
        return await this.questionService.findAllByQuizz(quizzId);
    }

    @Post()
    async createQuizz(@Body() createQuestionDTO: CreateQuestionDTO): Promise<any> {
        return await this.questionService.create(createQuestionDTO);
    }

}
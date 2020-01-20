import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { QuestionService } from './question.service';
import { Question } from './question.entity';
import { CreateQuestionDTO, UpdateQuestionDTO } from './question.dto';

@Controller('question')
export class QuestionController {

    constructor(private questionService: QuestionService) { }

    @Get()
    async getAllQuestions(): Promise<Question[]> {
        return await this.questionService.findAll();
    }

    @Get(':quizzId')
    async getAllByCampaing(@Param('quizzId') quizzId): Promise<any> {
        return await this.questionService.findAllByQuizz(quizzId);
    }

    @Get('detail/:questionId')
    async getQuestionDetailById(@Param('questionId') questionId): Promise<any> {
        return await this.questionService.getQuestionDetailById(questionId);
    }

    @Get('quizz/:quizzId')
    async getAllByUserQuizz(@Param('quizzId') quizzId): Promise<any> {
        return await this.questionService.findAllByUserQuizz(quizzId);
    }

    @Post()
    async createQuestion(@Body() createQuestionDTO: CreateQuestionDTO): Promise<any> {
        return await this.questionService.create(createQuestionDTO);
    }

    @Put()
    async updateQuestion(@Body() updateQuestionDTO: UpdateQuestionDTO): Promise<any> {
        return await this.questionService.update(updateQuestionDTO);
    }

    @Delete(':questionId')
    async deleteQuestion(@Param('questionId') questionId): Promise<any> {
        return await this.questionService.delete(questionId);
    }

}
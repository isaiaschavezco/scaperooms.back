import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quizz } from './quizz.entity';
import { Campaing } from '../campaing/campaing.entity';
import { CreateQuizzDTO } from './quizz.dto';

@Injectable()
export class QuizzService {
    constructor(@InjectRepository(Quizz) private quizzRepository: Repository<Quizz>,
        @InjectRepository(Campaing) private campaingRepository: Repository<Campaing>) { }

    async findAll(): Promise<Quizz[]> {
        try {
            const quizzList = await this.quizzRepository.find();
            return quizzList;
        } catch (err) {
            console.log("QuizzService - findAll: ", err);

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error getting quizzes',
            }, 500);
        }
    }

    async findAllByCampaing(campaingId: number): Promise<Quizz[]> {
        try {
            const quizzList = await this.quizzRepository.find({
                where: { campaing: campaingId },
                order: { createdAt: 'DESC' }
            });
            return quizzList;
        } catch (err) {
            console.log("QuizzService - findAll: ", err);

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error getting quizzes',
            }, 500);
        }
    }

    async create(createDTO: CreateQuizzDTO): Promise<any> {
        try {

            const quizzCampaing = await this.campaingRepository.findOne(createDTO.campaingId);

            let newQuizz = await this.quizzRepository.create({
                name: createDTO.name,
                isActive: false,
                isDeleted: false,
                isSend: false,
                campaing: quizzCampaing
            });

            await this.quizzRepository.save(newQuizz);

            return { status: 0 };
        } catch (err) {
            console.log("QuizzService - create: ", err);

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error creating quizz',
            }, 500);
        }
    }

}

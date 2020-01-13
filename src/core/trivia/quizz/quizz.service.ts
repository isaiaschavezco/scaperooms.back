import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Quizz } from './quizz.entity';
import { Campaing } from '../campaing/campaing.entity';
import { User } from '../../users/user/user.entity';
import { Pointsbyuser } from '../pointsbyuser/pointsbyuser.entity';
import { CreateQuizzDTO, SendQuizzDTO, QuizzListDTO, GetQuizzesByUserCampaingDTO } from './quizz.dto';
import * as moment from 'moment';

@Injectable()
export class QuizzService {
    constructor(@InjectRepository(Quizz) private quizzRepository: Repository<Quizz>,
        @InjectRepository(Campaing) private campaingRepository: Repository<Campaing>,
        @InjectRepository(User) private userRepository: Repository<User>) { }

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

    async findAllByCampaing(campaingId: number): Promise<QuizzListDTO[]> {
        try {
            let listToReturn = [];


            const quizzList = await this.quizzRepository.find({
                relations: ["question"],
                where: { campaing: campaingId },
                order: { createdAt: 'DESC' }
            });

            quizzList.forEach(tempQuizz => {
                let quizzObj = new QuizzListDTO();
                quizzObj.quizzId = tempQuizz.id;
                quizzObj.name = tempQuizz.name;
                quizzObj.createdAt = moment(tempQuizz.createdAt).format('DD/MMM/YYYY');
                quizzObj.startedAt = moment(tempQuizz.startedAt).format('DD/MMM/YYYY');
                quizzObj.finishedAt = moment(tempQuizz.finishedAt).format('DD/MMM/YYYY');
                quizzObj.isActive = tempQuizz.isActive;
                quizzObj.isDeleted = tempQuizz.isDeleted;
                quizzObj.isSend = tempQuizz.isSend;

                quizzObj.points = tempQuizz.points;

                listToReturn.push(quizzObj);
            });

            return listToReturn;
        } catch (err) {
            console.log("QuizzService - findAllByCampaing: ", err);

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
                time: 0,
                points: 0,
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

    async send(sendQuizzDTO: SendQuizzDTO): Promise<any> {
        try {

            let filterQueries = [];

            let quizzToSend = await this.quizzRepository.findOne(sendQuizzDTO.quizzId, {
                relations: ["campaing", "campaing.target", "campaing.target.city", "campaing.target.chain", "campaing.target.position", "campaing.target.type"]
            });

            // Se almacena fecha de inicio - fin de la trivia
            quizzToSend.startedAt = new Date(sendQuizzDTO.startDate);
            quizzToSend.finishedAt = new Date(sendQuizzDTO.finishDate);
            quizzToSend.isSend = true;
            quizzToSend.isActive = true;

            quizzToSend.campaing.target.forEach(target => {

                let tempTargetObject = {};

                if (target.initAge !== null) {
                    tempTargetObject['age'] = Between(target.initAge, target.finalAge);
                }

                if (target.gender !== null) {
                    tempTargetObject['gender'] = target.gender;
                }

                if (target.chain !== null) {
                    tempTargetObject['chain'] = target.chain.id;
                }

                if (target.city !== null) {
                    tempTargetObject['city'] = target.city.id;
                }

                if (target.position !== null) {
                    tempTargetObject['position'] = target.position.id;
                }

                if (target.type !== null) {
                    tempTargetObject['type'] = target.type.id;
                }

                if (Object.keys(tempTargetObject).length > 0) {
                    filterQueries.push(tempTargetObject);
                }
            });

            const users = await this.userRepository.find({
                select: ["id"],
                where: filterQueries
            });

            // Se hace relación de trivias con usuarios
            quizzToSend.user = users;

            await this.quizzRepository.save(quizzToSend);

            return users;
        } catch (err) {
            console.log("QuizzService - send: ", err);

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error sending quizz',
            }, 500);
        }
    }

    async findQuizzesByUserCampaing(getQuizzesByUserCampaingDTO: GetQuizzesByUserCampaingDTO): Promise<any> {
        try {

            const campaingSelected = await this.campaingRepository.findOne(getQuizzesByUserCampaingDTO.campaingId, {
                select: ["id", "name"]
            });

            const user = await this.userRepository.findOne({
                where: { email: getQuizzesByUserCampaingDTO.email }
            });

            const response = await this.quizzRepository.createQueryBuilder("quizz")
                // .innerJoin("quizz.answerbyuserquizz", "answ", "answ.user = :userId", { userId: user.id })
                .leftJoinAndSelect("quizz.answerbyuserquizz", "answ", "answ.user = :userId", { userId: user.id })
                .innerJoin("quizz.campaing", "campaing", "campaing.id = :campaingId", { campaingId: getQuizzesByUserCampaingDTO.campaingId })
                .innerJoin("quizz.user", "user", "user.email = :email", { email: getQuizzesByUserCampaingDTO.email })
                .where("quizz.isActive = :isActive AND quizz.isSend = :isSend AND quizz.isDeleted = :isDeleted", { isActive: true, isSend: true, isDeleted: false })
                .getMany();

            let quizzListToReturn = [];

            response.forEach(tempQuizz => {
                let quizzFormat = {};
                quizzFormat["id"] = tempQuizz.id;
                quizzFormat["name"] = tempQuizz.name;
                quizzFormat["finishedAt"] = moment(tempQuizz.finishedAt).format('DD/MMM/YYYY');
                quizzFormat["time"] = tempQuizz.time;
                quizzFormat["quizzPoints"] = tempQuizz.points;
                quizzFormat["userPoints"] = tempQuizz.answerbyuserquizz.length > 0 ? tempQuizz.answerbyuserquizz[0].points : 0;
                quizzListToReturn.push(quizzFormat);
            });

            return { campaing: campaingSelected, quizzes: quizzListToReturn };
        } catch (err) {
            console.log("QuizzService - findQuizzesByUserCampaing: ", err);

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error getting quizzes',
            }, 500);
        }
    }

    async getCampaingUserHistoy(email: string): Promise<any> {
        try {

            const campaingsList = await this.quizzRepository.createQueryBuilder("quizz")
                // .select(["cmp.id", "cmp.name", "cmp.createdAt", "cmp.isBiodermaGame"])
                // .addSelect("SUM(pobyus.points)", "sum")
                .leftJoinAndSelect("quizz.campaing", "cmp")
                .leftJoin("quizz.user", "user", "user.email = :email", { email: email })
                .leftJoinAndSelect("quizz.pointsbyuser", "pobyus")
                .where("quizz.isActive = :isActive AND quizz.isSend = :isSend AND quizz.isDeleted = :isDeleted", { isActive: true, isSend: true, isDeleted: false })
                // .groupBy("cmp.id")
                .getMany();

            return { campaings: campaingsList };
        } catch (err) {
            console.log("QuizzService - getCampaingUserHistoy: ", err);

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error getting campaing history',
            }, 500);
        }
    }

}

import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Quizz } from './quizz.entity';
import { Campaing } from '../campaing/campaing.entity';
import { User } from '../../users/user/user.entity';
import { Pointsbyuser } from '../pointsbyuser/pointsbyuser.entity';
import { Question } from '../question/question.entity';
import { Answerbyuserquizz } from '../answerbyuserquizz/answerbyuserquizz.entity';
import { CreateQuizzDTO, SendQuizzDTO, QuizzListDTO, GetQuizzesByUserCampaingDTO, RemoveQuizzDTO } from './quizz.dto';
import * as moment from 'moment-timezone';
import * as bcrypt from 'bcrypt';

@Injectable()
export class QuizzService {
    constructor(@InjectRepository(Quizz) private quizzRepository: Repository<Quizz>,
        @InjectRepository(Campaing) private campaingRepository: Repository<Campaing>,
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Pointsbyuser) private pointsByUserRepository: Repository<Pointsbyuser>,
        @InjectRepository(Question) private questionRepository: Repository<Question>,
        @InjectRepository(Answerbyuserquizz) private answerByUserRepository: Repository<Answerbyuserquizz>) { }

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
                quizzObj.createdAt = moment(tempQuizz.createdAt).format('DD/MM/YYYY');
                quizzObj.startedAt = moment(tempQuizz.startedAt).format('DD/MM/YYYY HH:mm:ss');
                quizzObj.finishedAt = moment(tempQuizz.finishedAt).format('DD/MM/YYYY HH:mm:ss');
                quizzObj.isActive = tempQuizz.isActive;
                quizzObj.isDeleted = tempQuizz.isDeleted;
                quizzObj.isSend = tempQuizz.isSend;
                quizzObj.questions = tempQuizz.question.length;

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

            console.log("sendQuizzDTO: ", sendQuizzDTO);

            let filterQueries = [];
            let notificationToAllUsers = false;

            let quizzToSend = await this.quizzRepository.findOne(sendQuizzDTO.quizzId, {
                relations: ["campaing", "campaing.target", "campaing.target.city", "campaing.target.chain", "campaing.target.position", "campaing.target.type", "campaing.target.role", "campaing.target.delegation"]
            });

            // Se almacena fecha de inicio - fin de la trivia
            quizzToSend.startedAt = new Date(sendQuizzDTO.startDate);
            quizzToSend.finishedAt = new Date(sendQuizzDTO.finishDate);
            quizzToSend.isSend = true;
            quizzToSend.isActive = true;

            quizzToSend.campaing.target.forEach(target => {

                // console.log("target: ", target);

                let tempTargetObject = {};

                //Notificaciones a todos los usuarios
                if (target.allUsers) {
                    notificationToAllUsers = true;
                }

                //Notificaciones por filtro
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

                if (target.delegation !== null) {
                    tempTargetObject['delegation'] = target.delegation.id;
                }

                if (target.position !== null) {
                    tempTargetObject['position'] = target.position.id;
                }

                if (target.type !== null) {
                    tempTargetObject['type'] = target.type.id;
                }

                if (target.role !== null) {
                    tempTargetObject['role'] = target.role.id;
                }

                if (Object.keys(tempTargetObject).length > 0) {
                    filterQueries.push(tempTargetObject);
                }
            });

            let users;

            if (notificationToAllUsers) {
                users = await this.userRepository.find({
                    select: ["id"]
                });
            } else {
                users = await this.userRepository.find({
                    select: ["id"],
                    where: filterQueries
                });
            }

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

            const actualDate = moment().tz('America/Mexico_City').format();

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
                quizzFormat["finishedAt"] = moment(tempQuizz.finishedAt).format('DD/MM/YYYY');
                quizzFormat["time"] = tempQuizz.time;
                quizzFormat["quizzPoints"] = tempQuizz.points;
                quizzFormat["userPoints"] = tempQuizz.answerbyuserquizz.length > 0 ? tempQuizz.answerbyuserquizz[0].points : 0;
                quizzFormat["canBeAnswered"] = tempQuizz.answerbyuserquizz.length > 0 ? false : (!moment(actualDate).isAfter(moment(tempQuizz.finishedAt).format()));
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

    async delete(removeQuizzDTO: RemoveQuizzDTO): Promise<any> {
        try {
            let response = { status: 0 };

            const userExist = await this.userRepository.findOne({
                where: { email: removeQuizzDTO.email },
                select: ["id", "name", "email", "points", "password"]
            });

            if (userExist) {
                const match = await bcrypt.compare(removeQuizzDTO.password, userExist.password);

                if (match) {

                    let pointsByUserToRemove = await this.pointsByUserRepository
                    .createQueryBuilder("pobyus")
                    .select(["pobyus.id", "pobyus.points", "pobyus.isAdded", "pobyus.createdAt", "pobyus.isDeleted"])
                    .addSelect("user.id")
                    .leftJoin('pobyus.quizz', 'quizz')
                    .leftJoinAndSelect('pobyus.pointsType', 'poty')
                    .leftJoin('pobyus.user', 'user')
                    .where('quizz.id = :quizzId', { quizzId: removeQuizzDTO.quizzId })
                    .getMany();

                    for (let index = 0; index < pointsByUserToRemove.length; index++) {
                        const tempPointsByUser = pointsByUserToRemove[index];

                        if (tempPointsByUser.points > 0) {

                            let userToChange = await this.userRepository.findOne(tempPointsByUser.user.id, {
                                select: ["id", "points", "biodermaGamePoints"]
                            });

                            if (userToChange) {

                                if (tempPointsByUser.pointsType.id == 2) {

                                    userToChange.biodermaGamePoints -= tempPointsByUser.points;
                                    if (userToChange.biodermaGamePoints <= 0) {
                                        userToChange.biodermaGamePoints = 0;
                                    }
                                } else {

                                    userToChange.points -= tempPointsByUser.points;
                                    if (userToChange.points <= 0) {
                                        userToChange.points = 0;
                                    }
                                }
                            }

                            await this.userRepository.save(userToChange);
                        }

                    }

                    let questionsToRemove = await this.questionRepository.find({
                        where: { quizz: removeQuizzDTO.quizzId }
                    });

                    let answerByUserToRemove = await this.answerByUserRepository.find({
                        where: { quizz: removeQuizzDTO.quizzId }
                    });

                    let quizzToRemove = await this.quizzRepository.findOne(removeQuizzDTO.quizzId);

                    await this.questionRepository.remove(questionsToRemove);
                    await this.answerByUserRepository.remove(answerByUserToRemove);
                    await this.pointsByUserRepository.remove(pointsByUserToRemove);
                    await this.quizzRepository.remove(quizzToRemove);

                    response = { status: 0 };

                } else {
                    response = { status: 2 };
                }

            } else {
                response = { status: 1 };
            }

            return response;
        } catch (err) {
            console.log("QuizzService - delete: ", err);

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error deleting quizzes',
            }, 500);
        }
    }

    async generateQuizzReport(quizzId: string): Promise<any> {
        try {

            const report = await this.quizzRepository.createQueryBuilder('quizz')
                .select('user.name', 'nombre')
                .addSelect('user.lastName', 'apellido')
                .addSelect('user.email', 'email')
                .addSelect('type.name', 'tipo')
                .addSelect('city.name', 'ciudad')
                .addSelect('pobyus.points', 'puntos')
                .addSelect('quizz.name', 'trivia')
                .addSelect('camp.name', 'campaña')
                .innerJoin('quizz.campaing', 'camp')
                .innerJoin('quizz.user', 'user')
                .innerJoin('user.type', 'type')
                .innerJoin('user.city', 'city')
                .innerJoin('user.pointsbyuser', 'pobyus', 'pobyus.quizz = quizz.id')
                .where('quizz.id = :quizzId AND user.isActive = true', { quizzId: parseInt(quizzId) })
                .getRawMany();

            return { report };
        } catch (err) {
            console.log('QuizzService - generateQuizzReport: ', err);

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error generating report',
            }, 500);
        }
    }

}

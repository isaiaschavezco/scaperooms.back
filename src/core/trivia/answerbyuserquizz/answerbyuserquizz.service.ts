import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Answerbyuserquizz } from './answerbyuserquizz.entity';
import { Quizz } from '../quizz/quizz.entity';
import { Pointsbyuser } from '../pointsbyuser/pointsbyuser.entity';
import { User } from '../../users/user/user.entity';
import { PointsType } from '../points-type/points-type.entity';
import { SetUserAnswers, SetUserAnswersByQuestion } from './answerbyuserquizz.dto';

@Injectable()
export class AnswerbyuserquizzService {

    constructor(@InjectRepository(Answerbyuserquizz) private answerbyuserquizzRepository: Repository<Answerbyuserquizz>,
        @InjectRepository(Quizz) private quizzRepository: Repository<Quizz>,
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Pointsbyuser) private pointsbyuserRepository: Repository<Pointsbyuser>,
        @InjectRepository(PointsType) private pointsTypeRepository: Repository<PointsType>) { }

    async setUserAnswer(setUserAnswers: SetUserAnswers): Promise<any> {
        try {

            const quizzSelected = await this.quizzRepository.findOne(setUserAnswers.id, {
                relations: ["campaing"]
            });
            const userSelected = await this.userRepository.findOne({
                where: { email: setUserAnswers.email }
            });

            const quizzPointsType = await this.pointsTypeRepository.findOne(quizzSelected.campaing.isBiodermaGame ? 2 : 1);

            const newUserAnswer = this.answerbyuserquizzRepository.create({
                answer: JSON.stringify(setUserAnswers.answers),
                points: setUserAnswers.points,
                isActive: true,
                quizz: quizzSelected,
                user: userSelected
            });

            const newPointsByUSer = this.pointsbyuserRepository.create({
                points: setUserAnswers.points,
                isAdded: true,
                isDeleted: false,
                user: userSelected,
                quizz: quizzSelected,
                pointsType: quizzPointsType
            });

            await this.answerbyuserquizzRepository.save(newUserAnswer);

            return { status: 0 };

        } catch (err) {
            console.log("AnswerbyuserquizzService - setUserAnswer: ", err);

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error setting user answer',
            }, 500);
        }
    }

    async setUserAnswerByquestion(setUserAnswersByQuestion: SetUserAnswersByQuestion): Promise<any> {
        try {

            let newAnswerByUser = null;
            let newUserAnswer = null;
            let newPointsByUSer = null;

            // Init values
            let userAnswering = await this.userRepository.findOne({
                select: ["id", "points", "biodermaGamePoints", "role"],
                relations: ["role"],
                where: { email: setUserAnswersByQuestion.email }
            });

            if (userAnswering.role.id == 2) {

                const quizzAnswering = await this.quizzRepository.findOne(setUserAnswersByQuestion.quizzId, {
                    relations: ["campaing"]
                });

                const userResponse = JSON.parse(setUserAnswersByQuestion.userResponse);

                // Se realiza registro de las respuestas del usuario
                if (setUserAnswersByQuestion.isFirstQuestion) {

                    newAnswerByUser = this.answerbyuserquizzRepository.create({
                        answer: JSON.stringify([{
                            questionId: setUserAnswersByQuestion.questionId,
                            response: userResponse
                        }]),
                        points: setUserAnswersByQuestion.points,
                        isActive: true,
                        user: userAnswering,
                        quizz: quizzAnswering
                    });

                } else {

                    newAnswerByUser = await this.answerbyuserquizzRepository.findOne({
                        where: { user: userAnswering, quizz: quizzAnswering, isActive: true }
                    });

                    newAnswerByUser.points += setUserAnswersByQuestion.points;

                    let userResponseToUpdate = JSON.parse(newAnswerByUser.answer);
                    userResponseToUpdate.push({
                        questionId: setUserAnswersByQuestion.questionId,
                        response: userResponse
                    });

                    newAnswerByUser.answer = JSON.stringify(userResponseToUpdate);

                    if (setUserAnswersByQuestion.isLastQuestion === true) {

                        newAnswerByUser.isActive = false;

                    }

                }

                // Se almacena la respuesta del usuario
                await this.answerbyuserquizzRepository.save(newAnswerByUser);

                // Se realiza registro de los puntos obtenidos
                if (setUserAnswersByQuestion.isFirstQuestion) {

                    const quizzPointsType = await this.pointsTypeRepository.findOne(quizzAnswering.campaing.isBiodermaGame ? 2 : 1);

                    newPointsByUSer = this.pointsbyuserRepository.create({
                        points: setUserAnswersByQuestion.points,
                        isAdded: true,
                        isDeleted: false,
                        user: userAnswering,
                        quizz: quizzAnswering,
                        pointsType: quizzPointsType
                    });

                } else {

                    newPointsByUSer = await this.pointsbyuserRepository.findOne({
                        where: { user: userAnswering.id, quizz: quizzAnswering.id }
                    });

                    newPointsByUSer.points += setUserAnswersByQuestion.points;

                }

                await this.pointsbyuserRepository.save(newPointsByUSer);

                // Se actualiza el puntaje del jugador 
                if (quizzAnswering.campaing.isBiodermaGame) {
                    userAnswering.biodermaGamePoints += setUserAnswersByQuestion.points;
                } else {
                    userAnswering.points += setUserAnswersByQuestion.points;
                }

                await this.userRepository.save(userAnswering);

            }

            return { status: 0 };

        } catch (err) {
            console.log("AnswerbyuserquizzService - setUserAnswerByquestion: ", err);

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error setting user answer',
            }, 500);
        }
    }

    // async findStateById(stateId: number): Promise<any> {
    //     try {
    //         const state = await this.cityRepository.findOne(stateId);
    //         return { state: state };
    //     } catch (err) {
    //         console.log("CityService - findStateById: ", err);

    //         throw new HttpException({
    //             status: HttpStatus.INTERNAL_SERVER_ERROR,
    //             error: 'Error getting state',
    //         }, 500);
    //     }
    // }

}
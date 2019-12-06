import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Answerbyuserquizz } from './answerbyuserquizz.entity';
import { Quizz } from '../quizz/quizz.entity';
import { Pointsbyuser } from '../pointsbyuser/pointsbyuser.entity';
import { User } from '../../users/user/user.entity';
import { PointsType } from '../points-type/points-type.entity';
import { SetUserAnswers } from './answerbyuserquizz.dto';

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
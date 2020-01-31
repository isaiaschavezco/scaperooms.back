import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Campaing } from './campaing.entity';
import { Target } from '../target/target.entity';
import { User } from '../../users/user/user.entity';
import { CreateCampaingDTO, GetCampaingsByUserDTO, GetUserCampaingHistory, RemoveCampaingDTO } from './campaing.dto';
import * as moment from 'moment';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CampaingService {

    constructor(@InjectRepository(Campaing) private campaingRepository: Repository<Campaing>,
        @InjectRepository(Target) private targetRepository: Repository<Target>,
        @InjectRepository(User) private userRepository: Repository<User>) { }

    async findAll(): Promise<Campaing[]> {
        try {
            const campaingList = await this.campaingRepository.find({
                relations: ["target", "target.city", "target.chain", "target.position", "target.type"]
            });
            return campaingList;
        } catch (err) {
            console.log("CampaingService - findAll: ", err);

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error getting campaings',
            }, 500);
        }
    }

    async findAllActives(isBioderma: boolean): Promise<Campaing[]> {
        try {
            const campaingList = await this.campaingRepository.find({
                where: { isDeleted: false, isBiodermaGame: isBioderma },
                order: { createdAt: 'DESC' },
                relations: ["target", "target.city", "target.chain", "target.position", "target.type"]
            });
            return campaingList;
        } catch (err) {
            console.log("CampaingService - findAllActives: ", err);

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error getting campaings',
            }, 500);
        }
    }

    async findTopCampaing(campaingId: number): Promise<any> {
        try {
            const response = await this.campaingRepository.findOne(campaingId, {
                relations: ["quizz", "quizz.user", "quizz.user.chain"]
            });
            return response;
        } catch (err) {
            console.log("CampaingService - findTopCampaing: ", err);

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error getting campaings',
            }, 500);
        }
    }

    async findCampaingsByUser(getCampaingsByUserDTO: GetCampaingsByUserDTO): Promise<any> {
        try {
            // sconsole.log("getCampaingsByUserDTO: ", getCampaingsByUserDTO);
            const response = await this.campaingRepository.createQueryBuilder("campaing")
                .select("campaing.id", "id")
                .distinct(true)
                .addSelect("campaing.name", "name")
                .addSelect("campaing.portrait", "portrait")
                .addSelect("campaing.isBiodermaGame", "type")
                .innerJoin("campaing.quizz", "quizz", "quizz.isActive = :isActive", { isActive: true })
                .innerJoin("quizz.user", "user", "user.email = :email", { email: getCampaingsByUserDTO.email })
                .where("campaing.isBiodermaGame = :isBiodermaGame", { isBiodermaGame: getCampaingsByUserDTO.isBiodermaGame })
                .getRawMany();
            return { campaings: response };
        } catch (err) {
            console.log("CampaingService - findCampaingsByUser: ", err);

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error getting campaings',
            }, 500);
        }
    }

    async create(createDTO: CreateCampaingDTO): Promise<any> {
        try {
            let newCampaing = this.campaingRepository.create({
                name: createDTO.name,
                portrait: createDTO.portrait,
                isActive: true,
                isDeleted: false,
                isBiodermaGame: createDTO.isBiodermaGame
            });

            const campaingTargets = await this.targetRepository.findByIds(createDTO.targets);

            newCampaing.target = campaingTargets;

            await this.campaingRepository.save(newCampaing);

            return { status: 0 };
        } catch (err) {
            console.log("CampaingService - create: ", err);

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error creating campaing',
            }, 500);
        }
    }

    async getCampaingUserHistoy(requestDTO: GetUserCampaingHistory): Promise<any> {
        try {
            let campaingHistoryToReturn = [];

            const campaingsList = await this.campaingRepository.createQueryBuilder("cmp")
                .select(["cmp.id", "cmp.name", "cmp.createdAt", "cmp.isBiodermaGame", "quizz.id", "pobyus.id", "pobyus.points"])
                .leftJoin("cmp.quizz", "quizz")
                .leftJoin("quizz.user", "user", "user.email = :email", { email: requestDTO.email })
                .leftJoin("quizz.pointsbyuser", "pobyus")
                .where("quizz.isActive = :isActive AND quizz.isSend = :isSend AND quizz.isDeleted = :isDeleted", { isActive: true, isSend: true, isDeleted: false })
                .groupBy("cmp.id")
                .addGroupBy("quizz.id")
                .addGroupBy("pobyus.id")
                .skip(requestDTO.page * 20)
                .take(20)
                .getMany();

            campaingsList.forEach(tempCamp => {

                let totalPoints = 0;
                tempCamp.quizz.forEach(tempQuizz => {

                    tempQuizz.pointsbyuser.forEach(tempPointsByUser => {
                        totalPoints += tempPointsByUser.points;
                    });

                });

                campaingHistoryToReturn.push({
                    id: tempCamp.id,
                    name: tempCamp.name,
                    createdAt: moment(tempCamp.createdAt).format('DD/MM/YYYY'),
                    isBiodermaGame: tempCamp.isBiodermaGame,
                    points: totalPoints
                });
            });

            return { campaings: campaingHistoryToReturn };
        } catch (err) {
            console.log("CampaingService - getCampaingUserHistoy: ", err);

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error getting campaing history',
            }, 500);
        }
    }

    async delete(removeCampaingDTO: RemoveCampaingDTO): Promise<any> {
        try {
            let response = { status: 0 };

            const userExist = await this.userRepository.findOne({
                where: { email: removeCampaingDTO.email },
                select: ["id", "name", "email", "points", "password"]
            });

            if (userExist) {
                const match = await bcrypt.compare(removeCampaingDTO.password, userExist.password);

                if (match) {

                    let campaingToRemove = await this.campaingRepository.findOne(removeCampaingDTO.campaingId, {
                        relations: ["target", "quizz"]
                    });

                    if (campaingToRemove.quizz.length > 0) {
                        response = { status: 11 };
                    } else {
                        await this.campaingRepository.remove(campaingToRemove);
                        response = { status: 0 };
                    }

                } else {
                    response = { status: 2 };
                }

            } else {
                response = { status: 1 };
            }

            return response;
        } catch (err) {
            console.log("CampaingService - delete: ", err);

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error deleting campaings',
            }, 500);
        }
    }

}

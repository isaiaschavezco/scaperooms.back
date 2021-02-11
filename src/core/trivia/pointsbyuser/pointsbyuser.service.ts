import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pointsbyuser } from './pointsbyuser.entity';
import { GetUserPointsHistory } from './pointsbyuser.dto';
import * as moment from 'moment';

@Injectable()
export class PointsbyuserService {

    constructor(@InjectRepository(Pointsbyuser) private pointsbyuserRepository: Repository<Pointsbyuser>) { }

    async getUserPointsHistory(requestDTO: GetUserPointsHistory): Promise<any> {
        try {

            let pointsByUserToReturn = [];

            const pointsByUserList = await this.pointsbyuserRepository.createQueryBuilder("pobyus")
                .select(["pobyus.id", "pobyus.points", "pobyus.isAdded", "pobyus.createdAt", "quizz.id", "quizz.name", "product.id", "product.title"])
                .innerJoin("pobyus.user", "user")
                .innerJoinAndSelect("pobyus.pointsType", "poty")
                .leftJoin("pobyus.quizz", "quizz")
                .leftJoin("pobyus.product", "product")
                .where("user.email = :userEmail AND pobyus.isDeleted = :isDeleted", { userEmail: requestDTO.email, isDeleted: false })
                .skip(requestDTO.page * 20)
                .orderBy("pobyus.createdAt", "DESC")
                .take(20)
                .getMany();

            pointsByUserList.forEach(points => {
                pointsByUserToReturn.push({
                    id: points.id,
                    quizz_id: points.quizz.id,
                    points: points.isAdded ? '+' + points.points : '-' + points.points,
                    createdAt: moment(points.createdAt).format('DD/MM/YYYY'),
                    pointsType: points.pointsType.name,
                    name: points.pointsType.id !== 4 ? (points.quizz ? points.quizz.name : points.product.title) : 'ADMINISTRACIÓN'
                });
            });

            return { points: pointsByUserToReturn };

        } catch (err) {
            console.log("PointsbyuserService - getUserPointsHistory: ", err);

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error getting points',
            }, 500);
        }
    }


    async getUserPointsHistoryByCampaing(campaingId: number): Promise<any> {
        try {

            let pointsByUserList = await this.pointsbyuserRepository.createQueryBuilder("pobyus")
                .select("user.id", "id")
                .addSelect("user.name", "name")
                .addSelect("user.lastName", "lastName")
                .addSelect("user.photo", "photo")
                .addSelect("user.nickname", "nickname")
                .addSelect("user.gender", "gender")
                .addSelect("user.email", "email")
                .addSelect("SUM(pobyus.points)", "totalPoints")
                .innerJoin("pobyus.user", "user")
                .leftJoin("pobyus.quizz", "quizz")
                .innerJoin("quizz.campaing", "cm", "cm.id = :campaingId", { campaingId: campaingId })
                .groupBy("user.id")
                .getRawMany();
            console.log("pointsByUserList: ",pointsByUserList)

            pointsByUserList.sort(function (a, b) {
                return b.totalPoints - a.totalPoints;
            });

            return { points: pointsByUserList };

        } catch (err) {
            console.log("PointsbyuserService - getUserPointsHistoryByCampaing: ", err);

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error getting points',
            }, 500);
        }
    }

}
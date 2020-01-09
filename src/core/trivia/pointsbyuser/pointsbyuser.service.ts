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
                .take(20)
                .getMany();

            pointsByUserList.forEach(points => {
                pointsByUserToReturn.push({
                    id: points.id,
                    points: points.points,
                    isAdded: points.isAdded,
                    createdAt: moment(points.createdAt).format('DD/MMM/YYYY'),
                    pointsType: points.pointsType,
                    quizz: points.quizz,
                    product: points.product
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

}
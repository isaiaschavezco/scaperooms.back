import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Position } from './position.entity';

@Injectable()
export class PositionService {

    constructor(@InjectRepository(Position) private positionRepository: Repository<Position>) { }

    async findAllNaosPositions(): Promise<any> {
        try {
            const positionList = await this.positionRepository.find({
                order: {
                    name: "ASC"
                }
            });

            return { workPositions: positionList };

        } catch (err) {
            console.log("PositionService - findAllNaosPositions: ", err);

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error getting positions',
            }, 500);
        }
    }

    async findNaosPositionById(positionId: number): Promise<any> {
        try {
            const position = await this.positionRepository.findOne(positionId);

            return { workPosition: position };

        } catch (err) {
            console.log("PositionService - findNaosPositionById: ", err);

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error getting positions',
            }, 500);
        }
    }

}
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Campaing } from './campaing.entity';

@Injectable()
export class CampaingService {

    constructor(@InjectRepository(Campaing) private campaingRepository: Repository<Campaing>) { }

    async findAll(): Promise<Campaing[]> {
        try {
            const campaingList = await this.campaingRepository.find();
            return campaingList;
        } catch (err) {
            console.log("CampaingService - findAll: ", err);

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error creating target',
            }, 500);
        }
    }

    async create(): Promise<Campaing[]> {
        try {
            const campaingList = await this.campaingRepository.find();
            return campaingList;
        } catch (err) {
            console.log("CampaingService - findAll: ", err);

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error creating target',
            }, 500);
        }
    }

}

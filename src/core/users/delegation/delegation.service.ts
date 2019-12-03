import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Delegation } from './delegation.entity';

@Injectable()
export class DelegationService {

    constructor(@InjectRepository(Delegation) private delegationRepository: Repository<Delegation>) { }

    async findAll(): Promise<any> {
        try {
            const citiesList = await this.delegationRepository.find({
                order: {
                    name: "ASC"
                }
            });
            return { cities: citiesList };
        } catch (err) {
            console.log("CityService - findAll: ", err);

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error getting states',
            }, 500);
        }
    }

    async findByStateId(stateId: number): Promise<any> {
        try {
            const citiesList = await this.delegationRepository.find({
                where: { city: stateId },
                order: {
                    name: "ASC"
                }
            });
            return { cities: citiesList };
        } catch (err) {
            console.log("DelegationService - findByStateId: ", err);

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error getting cities',
            }, 500);
        }
    }

}

import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { City } from './city.entity';

@Injectable()
export class CityService {

    constructor(@InjectRepository(City) private cityRepository: Repository<City>) { }

    async findAll(): Promise<any> {
        try {
            const citiesList = await this.cityRepository.find({
                order: {
                    name: "ASC"
                }
            });
            return { states: citiesList };
        } catch (err) {
            console.log("CityService - findAll: ", err);

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error getting states',
            }, 500);
        }
    }

    async findStateById(stateId: number): Promise<any> {
        try {
            const state = await this.cityRepository.findOne(stateId);
            return { state: state };
        } catch (err) {
            console.log("CityService - findStateById: ", err);

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error getting state',
            }, 500);
        }
    }

}
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Configuration } from './configuration.entity';

@Injectable()
export class ConfigutarionService {

    constructor(@InjectRepository(Configuration) private configurationRepository: Repository<Configuration>) { }

    async findClubStatus(): Promise<any> {
        try {

            const clubStatus = await this.configurationRepository.findOne(1);

            return { statusCart: clubStatus.isClubBiodermaActive };

        } catch (err) {
            console.log("ConfigutarionService - findClubStatus: ", err);

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error getting club status',
            }, 500);
        }
    }

    async findThemeColor(): Promise<any> {
        try {

            const clubStatus = await this.configurationRepository.findOne(1);

            return { seasonColors: JSON.parse(clubStatus.themes) };

        } catch (err) {
            console.log("ConfigutarionService - findThemeColor: ", err);

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error getting theme',
            }, 500);
        }
    }

}
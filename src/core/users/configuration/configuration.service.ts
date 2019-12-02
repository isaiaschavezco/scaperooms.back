import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Configuration } from './configuration.entity';

@Injectable()
export class ConfigutarionService {

    constructor(@InjectRepository(Configuration) private configurationRepository: Repository<Configuration>) { }

    // async RequesLogin(requestDTO: ReuestSesionDTO): Promise<any> {
    //     try {

    //         return response;

    //     } catch (err) {
    //         console.log("SesionService - RequesLogin: ", err);

    //         throw new HttpException({
    //             status: HttpStatus.INTERNAL_SERVER_ERROR,
    //             error: 'Error requesting login',
    //         }, 500);
    //     }
    // }

}
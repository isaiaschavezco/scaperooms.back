import { Repository } from 'typeorm';
import { City } from './city.entity';
export declare class CityService {
    private cityRepository;
    constructor(cityRepository: Repository<City>);
    findAll(): Promise<any>;
}

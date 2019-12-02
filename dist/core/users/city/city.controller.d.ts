import { CityService } from './city.service';
export declare class CityController {
    private cityService;
    constructor(cityService: CityService);
    findAllStates(): Promise<any>;
}

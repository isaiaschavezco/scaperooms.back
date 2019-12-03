import { DelegationService } from './delegation.service';
export declare class DelegationController {
    private cityService;
    constructor(cityService: DelegationService);
    findAllCities(): Promise<any>;
    findCityByState(stateId: any): Promise<any>;
}

import { DelegationService } from './delegation.service';
export declare class DelegationController {
    private cityService;
    constructor(cityService: DelegationService);
    findCityByState(stateId: any): Promise<any>;
}

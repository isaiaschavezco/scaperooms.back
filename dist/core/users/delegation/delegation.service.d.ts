import { Repository } from 'typeorm';
import { Delegation } from './delegation.entity';
export declare class DelegationService {
    private delegationRepository;
    constructor(delegationRepository: Repository<Delegation>);
    findAll(): Promise<any>;
    findByStateId(stateId: number): Promise<any>;
}

import { ChainService } from './chain.service';
import { CreateChainDTO } from './chain.dto';
export declare class ChainController {
    private chainService;
    constructor(chainService: ChainService);
    findAll(): Promise<any>;
    create(createDTO: CreateChainDTO): Promise<number>;
    delete(id: any): Promise<number>;
}

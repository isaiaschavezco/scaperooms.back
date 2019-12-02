import { ChainService } from './chain.service';
import { Chain } from './chain.entity';
import { CreateChainDTO } from './chain.dto';
export declare class ChainController {
    private chainService;
    constructor(chainService: ChainService);
    findAll(): Promise<Chain[]>;
    create(createDTO: CreateChainDTO): Promise<number>;
    delete(id: any): Promise<number>;
}

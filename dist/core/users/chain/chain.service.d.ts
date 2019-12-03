import { Repository } from 'typeorm';
import { Chain } from './chain.entity';
import { CreateChainDTO } from './chain.dto';
export declare class ChainService {
    private chainRepository;
    constructor(chainRepository: Repository<Chain>);
    findAll(): Promise<any>;
    create(createDTO: CreateChainDTO): Promise<number>;
    delete(chainId: number): Promise<number>;
}

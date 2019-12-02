import { Repository } from 'typeorm';
import { Target } from './target.entity';
import { City } from '../../users/city/city.entity';
import { Chain } from '../../users/chain/chain.entity';
import { Type } from '../../users/type/type.entity';
import { Position } from '../../users/position/position.entity';
import { CreateTargetDTO } from './target.dto';
export declare class TargetService {
    private targetRepository;
    private cityRepository;
    private chainRepository;
    private typeRepository;
    private positionRepository;
    constructor(targetRepository: Repository<Target>, cityRepository: Repository<City>, chainRepository: Repository<Chain>, typeRepository: Repository<Type>, positionRepository: Repository<Position>);
    findAllTargets(): Promise<Target[]>;
    create(createDTO: CreateTargetDTO): Promise<number>;
}

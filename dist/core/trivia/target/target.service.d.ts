import { Repository } from 'typeorm';
import { Target } from './target.entity';
import { City } from '../../users/city/city.entity';
import { Delegation } from '../../users/delegation/delegation.entity';
import { Chain } from '../../users/chain/chain.entity';
import { Type } from '../../users/type/type.entity';
import { Position } from '../../users/position/position.entity';
import { Role } from '../../users/role/role.entity';
import { CreateTargetDTO, DeleteTargetDTO } from './target.dto';
export declare class TargetService {
    private targetRepository;
    private cityRepository;
    private chainRepository;
    private typeRepository;
    private positionRepository;
    private roleRepository;
    private delegationRepository;
    constructor(targetRepository: Repository<Target>, cityRepository: Repository<City>, chainRepository: Repository<Chain>, typeRepository: Repository<Type>, positionRepository: Repository<Position>, roleRepository: Repository<Role>, delegationRepository: Repository<Delegation>);
    findAllTargets(): Promise<Target[]>;
    create(createDTO: CreateTargetDTO): Promise<any>;
    delete(deleteDTO: DeleteTargetDTO): Promise<any>;
}

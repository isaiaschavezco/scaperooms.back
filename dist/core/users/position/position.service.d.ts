import { Repository } from 'typeorm';
import { Position } from './position.entity';
export declare class PositionService {
    private positionRepository;
    constructor(positionRepository: Repository<Position>);
    findAllNaosPositions(): Promise<any>;
    findNaosPositionById(positionId: number): Promise<any>;
}

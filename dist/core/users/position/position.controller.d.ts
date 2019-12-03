import { PositionService } from './position.service';
export declare class PositionController {
    private positionService;
    constructor(positionService: PositionService);
    findAllNaosPositions(): Promise<any>;
    findNaosPositionById(id: any): Promise<any>;
}

import { Repository } from 'typeorm';
import { Pointsbyuser } from './pointsbyuser.entity';
import { GetUserPointsHistory } from './pointsbyuser.dto';
export declare class PointsbyuserService {
    private pointsbyuserRepository;
    constructor(pointsbyuserRepository: Repository<Pointsbyuser>);
    getUserPointsHistory(requestDTO: GetUserPointsHistory): Promise<any>;
    getUserPointsHistoryByCampaing(campaingId: number): Promise<any>;
}

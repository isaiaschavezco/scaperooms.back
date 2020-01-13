import { PointsbyuserService } from './pointsbyuser.service';
import { GetUserPointsHistory } from './pointsbyuser.dto';
export declare class PointsbyuserController {
    private pointsbyuserService;
    constructor(pointsbyuserService: PointsbyuserService);
    getUserPointsHistory(getUserPointsHistory: GetUserPointsHistory): Promise<any>;
    getCampaingUserHistory(getUserPointsHistory: GetUserPointsHistory): Promise<any>;
}

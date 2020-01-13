import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { PointsbyuserService } from './pointsbyuser.service';
import { GetUserPointsHistory } from './pointsbyuser.dto';

@Controller('pointsbyuser')
export class PointsbyuserController {

    constructor(private pointsbyuserService: PointsbyuserService) { }

    @Post('history')
    async getUserPointsHistory(@Body() getUserPointsHistory: GetUserPointsHistory): Promise<any> {
        return await this.pointsbyuserService.getUserPointsHistory(getUserPointsHistory);
    }

    @Post('campaing/history')
    async getCampaingUserHistory(@Body() getUserPointsHistory: GetUserPointsHistory): Promise<any> {
        return await this.pointsbyuserService.getCampaingUserHistory(getUserPointsHistory);
    }

}
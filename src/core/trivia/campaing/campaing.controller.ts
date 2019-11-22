import { Controller, Get } from '@nestjs/common';
import { CampaingService } from './campaing.service';
import { Campaing } from './campaing.entity';

@Controller('campaing')
export class CampaingController {

    constructor(private campaingService: CampaingService) { }

    @Get()
    async getAllNotification(): Promise<Campaing[]> {
        return await this.campaingService.findAll();
    }

    // @Post()
    // async createNotification(): Promise<any> {
    //     return await this.notificationService.createNotification('Notificacion desde API');
    // }

}
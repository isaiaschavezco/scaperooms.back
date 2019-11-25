import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CampaingService } from './campaing.service';
import { Campaing } from './campaing.entity';
import { CreateCampaingDTO } from './campaing.dto';

@Controller('campaing')
export class CampaingController {

    constructor(private campaingService: CampaingService) { }

    @Get()
    async getAllCampaings(): Promise<Campaing[]> {
        return await this.campaingService.findAll();
    }

    @Get(':isBioderma')
    async getAllActiveCampaings(@Param('isBioderma') isBioderma): Promise<Campaing[]> {
        return await this.campaingService.findAllActives(isBioderma);
    }

    @Post()
    async createCampaing(@Body() createCampaingDTO: CreateCampaingDTO): Promise<any> {
        return await this.campaingService.create(createCampaingDTO);
    }

}
import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { CampaingService } from './campaing.service';
import { Campaing } from './campaing.entity';
import { CreateCampaingDTO, GetCampaingsByUserDTO, GetUserCampaingHistory, RemoveCampaingDTO, UpdateCampaingDTO } from './campaing.dto';

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

    @Get('report/:campaingId')
    async getCampaingReport(@Param('campaingId') campaingId): Promise<Campaing[]> {
        return await this.campaingService.generateCampaingReport(campaingId);
    }

    @Get(':campaingId/top')
    async getCampaingTop(@Param('campaingId') campaingId): Promise<any> {
        return await this.campaingService.findTopCampaing(campaingId);
    }

    @Put()
    async updateCampaing(@Body() updateCampaingDTO: UpdateCampaingDTO): Promise<any> {
        return await this.campaingService.update(updateCampaingDTO);
    }

    @Post('user')
    async findCampaingsByUser(@Body() getCampaingsByUserDTO: GetCampaingsByUserDTO): Promise<any> {
        return await this.campaingService.findCampaingsByUser(getCampaingsByUserDTO);
    }

    @Post()
    async createCampaing(@Body() createCampaingDTO: CreateCampaingDTO): Promise<any> {
        return await this.campaingService.create(createCampaingDTO);
    }

    @Post('history')
    async getUserCampaingHistory(@Body() getUserCampaingHistory: GetUserCampaingHistory): Promise<any> {
        return await this.campaingService.getCampaingUserHistoy(getUserCampaingHistory);
    }

    @Put('remove')
    async deleteCampaing(@Body() removeCampaingDTO: RemoveCampaingDTO): Promise<any> {
        return await this.campaingService.delete(removeCampaingDTO);
    }

}

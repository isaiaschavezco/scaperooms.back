import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ConfigutarionService } from './configuration.service';
import { UpdateClubStatusDTO, UpdateThemeDTO, UpdateBiodermaGameStatusDTO, UpdateBiodermaGameImageDTO, UpdateBiodermaGameCampaingImageDTO, UpdateBiodermaGameBlogImageDTO } from './configuration.dto';

@Controller('configutarion')
export class ConfigutarionController {

    constructor(private configutarionService: ConfigutarionService) { }

    @Get('general')
    async findGeneralConfiguration(): Promise<any> {
        return await this.configutarionService.findGeneralConfiguration();
    }

    @Get('club')
    async findClubStatus(): Promise<any> {
        return await this.configutarionService.findClubStatus();
    }

    @Post('club')
    async updateClubBiodermaStatus(@Body() updateClubStatusDTO: UpdateClubStatusDTO): Promise<any> {
        return await this.configutarionService.updateClub(updateClubStatusDTO);
    }

    @Get('theme')
    async findThemeColor(): Promise<any> {
        return await this.configutarionService.findThemeColor();
    }

    @Post('theme')
    async updateThemeColor(@Body() updateThemeDTO: UpdateThemeDTO): Promise<any> {
        return await this.configutarionService.updateTheme(updateThemeDTO);
    }

    @Get('bioderma')
    async findBiodermaGameStatus(): Promise<any> {
        return await this.configutarionService.findBiodermaGameStatus();
    }

    @Post('bioderma')
    async updateBiodermaStatus(@Body() updateBiodermaGameStatusDTO: UpdateBiodermaGameStatusDTO): Promise<any> {
        return await this.configutarionService.updateBiodermaGame(updateBiodermaGameStatusDTO);
    }

    @Get('image')
    async findBiodermaGameImage(): Promise<any> {
        return await this.configutarionService.findBiodermaGameImage();
    }

    @Post('image')
    async updateBiodermaImage(@Body() updateBiodermaGameImageDTO: UpdateBiodermaGameImageDTO): Promise<any> {
        return await this.configutarionService.updateBiodermaGameImage(updateBiodermaGameImageDTO);
    }

    @Post('campaingimage')
    async updateBiodermaCampaignImage(@Body() updateBiodermaGameCampaingImageDTO: UpdateBiodermaGameCampaingImageDTO): Promise<any> {
        return await this.configutarionService.updateBiodermaGameCampaingImage(updateBiodermaGameCampaingImageDTO);
    }

    @Post('blogimage')
    async updateBiodermaBlogImage(@Body() updateBiodermaGameBlogImageDTO: UpdateBiodermaGameBlogImageDTO): Promise<any> {
        return await this.configutarionService.updateBiodermaGameBlogImage(updateBiodermaGameBlogImageDTO);
    }

}
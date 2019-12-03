import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ConfigutarionService } from './configuration.service';

@Controller('configutarion')
export class ConfigutarionController {

    constructor(private configutarionService: ConfigutarionService) { }

    @Get('club')
    async findClubStatus(): Promise<any> {
        return await this.configutarionService.findClubStatus();
    }

    @Get('theme')
    async findThemeColor(): Promise<any> {
        return await this.configutarionService.findThemeColor();
    }

}
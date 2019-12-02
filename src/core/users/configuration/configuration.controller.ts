import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ConfigutarionService } from './configuration.service';

@Controller('configutarion')
export class ConfigutarionController {

    constructor(private configutarionService: ConfigutarionService) { }

    // @Post()
    // async Login(@Body() reuestSesionDTO: ReuestSesionDTO): Promise<any> {
    //     return await this.sesionService.RequesLogin(reuestSesionDTO);
    // }

}
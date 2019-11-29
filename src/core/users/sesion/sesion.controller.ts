import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { SesionService } from './sesion.service';
import { ReuestSesionDTO } from './sesion.dto';

@Controller('sesion')
export class SesionController {

    constructor(private sesionService: SesionService) { }

    @Post()
    async Login(@Body() reuestSesionDTO: ReuestSesionDTO): Promise<any> {
        return await this.sesionService.RequesLogin(reuestSesionDTO);
    }

}
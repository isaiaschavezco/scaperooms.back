import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { SesionService } from './sesion.service';
import { ReuestSesionDTO, UpdatePlayerID, ReuestSesionLogOutDTO } from './sesion.dto';

@Controller('sesion')
export class SesionController {

    constructor(private sesionService: SesionService) { }

    @Post()
    async Login(@Body() reuestSesionDTO: ReuestSesionDTO): Promise<any> {
        return await this.sesionService.RequesLogin(reuestSesionDTO);
    }

    @Post('admin')
    async LoginAdmin(@Body() reuestSesionDTO: ReuestSesionDTO): Promise<any> {
        return await this.sesionService.RequesLoginAdmin(reuestSesionDTO);
    }

    @Put('playerid')
    async SetPlayerId(@Body() updatePlayerID: UpdatePlayerID): Promise<any> {
        return await this.sesionService.SetPlayerID(updatePlayerID);
    }

    @Post('logout')
    async Logout(@Body() requestSesionLogOutDTO: ReuestSesionLogOutDTO): Promise<any> {
        return await this.sesionService.RequesLogout(requestSesionLogOutDTO);
    }

}
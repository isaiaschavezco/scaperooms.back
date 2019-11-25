import { Controller, Body, Get, Post, Delete, Param } from '@nestjs/common';
import { CityService } from './city.service';
import { City } from './city.entity';

@Controller('state')
export class CityController {

    constructor(private cityService: CityService) { }

    @Get()
    async findAllStates(): Promise<any> {
        return await this.cityService.findAll();
    }

}

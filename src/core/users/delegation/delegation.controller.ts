import { Controller, Body, Get, Post, Delete, Param } from '@nestjs/common';
import { DelegationService } from './delegation.service';
import { Delegation } from './delegation.entity';

@Controller('city')
export class DelegationController {

    constructor(private cityService: DelegationService) { }

    @Get(':id')
    async findCityByState(@Param('id') stateId): Promise<any> {
        return await this.cityService.findByStateId(stateId);
    }

}


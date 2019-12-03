import { Controller, Body, Get, Post, Delete, Param } from '@nestjs/common';
import { PositionService } from './position.service';
import { Position } from './position.entity';

@Controller('position')
export class PositionController {

    constructor(private positionService: PositionService) { }

    @Get()
    async findAllNaosPositions(): Promise<any> {
        return await this.positionService.findAllNaosPositions();
    }

    @Get(':id')
    async findNaosPositionById(@Param('id') id): Promise<any> {
        return await this.positionService.findNaosPositionById(id);
    }

}
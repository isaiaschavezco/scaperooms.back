import { Controller, Body, Get, Post, Delete, Param } from '@nestjs/common';
import { ChainService } from './chain.service';
import { Chain } from './chain.entity';
import { CreateChainDTO } from './chain.dto';


@Controller('chain')
export class ChainController {

    constructor(private chainService: ChainService) { }

    @Get()
    async findAll(): Promise<any> {
        return await this.chainService.findAll();
    }

    @Post()
    async create(@Body() createDTO: CreateChainDTO): Promise<number> {
        return await this.chainService.create(createDTO);
    }

    @Delete(':id')
    async delete(@Param('id') id): Promise<number> {
        return await this.chainService.delete(id);
    }

}

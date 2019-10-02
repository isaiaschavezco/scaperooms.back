import { Controller, Body, Get, Post, Delete, Param } from '@nestjs/common';
import { SubmenuService } from './submenu.service';
import { Submenu } from './submenu.entity';
// import { CreateChainDTO } from './chain.dto';

@Controller('submenu')
export class SubmenuController {

    constructor(private submenuService: SubmenuService) { }

    @Get(':id')
    async findByMenuId(@Param('id') id): Promise<Submenu[]> {
        return await this.submenuService.findByMenuId(id);
    }

    @Get('items/:id')
    async findSubMenuItems(@Param('id') id): Promise<Submenu[]> {
        return await this.submenuService.findSubMenuItems(id);
    }

    // @Post()
    // async create(@Body() createDTO: CreateChainDTO): Promise<number> {
    //     return await this.chainService.create(createDTO);
    // }

    // @Delete(':id')
    // async delete(@Param('id') id): Promise<number> {
    //     return await this.chainService.delete(id);
    // }
}

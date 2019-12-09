import { Controller, Get, Post, Body, Delete } from '@nestjs/common';
import { TargetService } from './target.service';
import { Target } from './target.entity';
import { CreateTargetDTO, DeleteTargetDTO } from './target.dto';

@Controller('target')
export class TargetController {

    constructor(private targetService: TargetService) { }

    @Get()
    async findAllTargets(): Promise<Target[]> {
        return await this.targetService.findAllTargets();
    }

    @Post()
    async create(@Body() createDTO: CreateTargetDTO): Promise<any> {
        return await this.targetService.create(createDTO);
    }

    @Delete()
    async delete(@Body() deleteDTO: DeleteTargetDTO): Promise<any> {
        return await this.targetService.delete(deleteDTO);
    }

    // @Get('items/:id')
    // async findSubMenuItems(@Param('id') id): Promise<Submenu[]> {
    //     return await this.submenuService.findSubMenuItems(id);
    // }

    // @Post()
    // async create(@Body() createSubmenuDTO: CreateSubmenuDTO): Promise<number> {
    //     return await this.submenuService.create(createSubmenuDTO);
    // }

    // @Post()
    // async create(@Body() createDTO: CreateChainDTO): Promise<number> {
    //     return await this.chainService.create(createDTO);
    // }

    // @Delete(':id')
    // async delete(@Param('id') id): Promise<number> {
    //     return await this.chainService.delete(id);
    // }

}

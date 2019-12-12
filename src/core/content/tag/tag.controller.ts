import { Controller, Body, Get, Post, Delete, Param } from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDTO } from './tag.dto';

@Controller('tag')
export class TagController {

    constructor(private tagService: TagService) { }

    @Get()
    async findAllTags(): Promise<any> {
        return await this.tagService.findAll();
    }

    @Post()
    async createTag(createDTO: CreateTagDTO): Promise<any> {
        return await this.tagService.createTag(createDTO);
    }

    // @Get(':id')
    // async findStateById(@Param('id') id): Promise<any> {
    //     return await this.cityService.findStateById(id);
    // }

}

import { Controller, Body, Get, Post, Delete, Param } from '@nestjs/common';
import {  ClinicService } from './clinic.service';
import { Clinic } from './clinic.entity';
import { CreateClinicDTO } from './clinic.dto';


@Controller('clinic')
export class ClinicController {

    constructor(private clinicService: ClinicService) { }

    @Get()
    async findAll(): Promise<any> {
        return await this.clinicService.findAll();
    }

    @Post()
    async create(@Body() createDTO: CreateClinicDTO): Promise<number> {
        return await this.clinicService.create(createDTO);
    }

    @Delete(':id')
    async delete(@Param('id') id): Promise<number> {
        return await this.clinicService.delete(id);
    }

}

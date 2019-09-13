import { Controller, Body, Get, Post, Put, Delete, Param } from '@nestjs/common';
import { ChainService } from './chain.service';


@Controller('chain')
export class ChainController {

    constructor(private chainService: ChainService) { }

}

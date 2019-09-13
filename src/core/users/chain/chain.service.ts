import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chain } from './chain.entity';

@Injectable()
export class ChainService {

    constructor(@InjectRepository(Chain) private chainRepository: Repository<Chain>) { }

}
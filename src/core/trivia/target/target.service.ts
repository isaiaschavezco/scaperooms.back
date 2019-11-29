import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Target } from './target.entity';
import { City } from '../../users/city/city.entity';
import { Chain } from '../../users/chain/chain.entity';
import { Type } from '../../users/type/type.entity';
import { Position } from '../../users/position/position.entity';
import { CreateTargetDTO } from './target.dto';

@Injectable()
export class TargetService {

    constructor(@InjectRepository(Target) private targetRepository: Repository<Target>,
        @InjectRepository(City) private cityRepository: Repository<City>,
        @InjectRepository(Chain) private chainRepository: Repository<Chain>,
        @InjectRepository(Type) private typeRepository: Repository<Type>,
        @InjectRepository(Position) private positionRepository: Repository<Position>) { }

    async findAllTargets(): Promise<Target[]> {
        try {
            const targetslist = await this.targetRepository.find();
            return targetslist;
        } catch (err) {
            console.log("TargetService - findAll: ", err);

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error getting targets',
            }, 500);
        }
    }

    async create(createDTO: CreateTargetDTO): Promise<number> {
        try {

            let stateTargetData = null;
            if (createDTO.state !== -1) {
                stateTargetData = await this.cityRepository.findOne(createDTO.state);
            }

            let chainTargetData = null;
            if (createDTO.chain !== -1) {
                chainTargetData = await this.chainRepository.findOne(createDTO.chain);
            }

            let userTypeTargetData = null;
            if (createDTO.userType !== -1) {
                userTypeTargetData = await this.typeRepository.findOne(createDTO.userType);
            }

            let naosPositionTargetData = null;
            if (createDTO.naosPosition !== -1) {
                naosPositionTargetData = await this.positionRepository.findOne(createDTO.naosPosition);
            }

            let genderTargetData = null;
            if (createDTO.gender !== -1) {
                genderTargetData = createDTO.gender === 0 ? false : true;
            }

            let newTarget = this.targetRepository.create({
                initAge: createDTO.initAge !== -1 ? createDTO.initAge : null,
                finalAge: createDTO.finalAge !== -1 ? createDTO.finalAge : null,
                gender: genderTargetData,
                city: stateTargetData,
                chain: chainTargetData,
                position: naosPositionTargetData,
                type: userTypeTargetData
            });

            const targetCreated = await this.targetRepository.save(newTarget);
            return targetCreated.id;

        } catch (err) {
            console.log("TargetService - create: ", err);

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error creating target',
            }, 500);
        }
    }

}

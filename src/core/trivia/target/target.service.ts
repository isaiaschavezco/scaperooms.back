import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Target } from './target.entity';
import { City } from '../../users/city/city.entity';
import { Chain } from '../../users/chain/chain.entity';
import { Type } from '../../users/type/type.entity';
import { Position } from '../../users/position/position.entity';
import { CreateTargetDTO, DeleteTargetDTO } from './target.dto';

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

    async create(createDTO: CreateTargetDTO): Promise<any> {
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
                allUsers: createDTO.allUsers,
                initAge: createDTO.initAge !== -1 ? createDTO.initAge : null,
                finalAge: createDTO.finalAge !== -1 ? createDTO.finalAge : null,
                gender: genderTargetData,
                city: stateTargetData,
                chain: chainTargetData,
                position: naosPositionTargetData,
                type: userTypeTargetData
            });

            const targetCreated = await this.targetRepository.save(newTarget);
            return {
                target: {
                    id: targetCreated.id,
                    initAge: targetCreated.initAge,
                    finalAge: targetCreated.finalAge,
                    gender: targetCreated.gender,
                    city: targetCreated.city ? targetCreated.city.name : null,
                    chain: targetCreated.chain ? targetCreated.chain.name : null,
                    position: targetCreated.position ? targetCreated.position.name : null,
                    type: targetCreated.type ? targetCreated.type.name : null,
                    allUsers: targetCreated.allUsers
                }
            };

        } catch (err) {
            console.log("TargetService - create: ", err);

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error creating target',
            }, 500);
        }
    }

    async delete(deleteDTO: DeleteTargetDTO): Promise<any> {
        try {

            const targetToDelete = await this.targetRepository.findOne(deleteDTO.targetId);
            await this.targetRepository.remove(targetToDelete);

            return { status: 0 };

        } catch (err) {
            console.log("TargetService - create: ", err);

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error creating target',
            }, 500);
        }
    }

}

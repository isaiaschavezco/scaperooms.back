import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Target } from './target.entity';
import { CreateTargetDTO } from './target.dto';

@Injectable()
export class TargetService {

    constructor(@InjectRepository(Target) private targetRepository: Repository<Target>) { }

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
            let newTarget = this.targetRepository.create({
                initAge: createDTO.initAge ? createDTO.initAge : null,
                finalAge: createDTO.finalAge ? createDTO.finalAge : null
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

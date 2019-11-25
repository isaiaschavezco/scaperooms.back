import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Campaing } from './campaing.entity';
import { Target } from '../target/target.entity';
import { CreateCampaingDTO } from './campaing.dto';

@Injectable()
export class CampaingService {

    constructor(@InjectRepository(Campaing) private campaingRepository: Repository<Campaing>,
        @InjectRepository(Target) private targetRepository: Repository<Target>) { }

    async findAll(): Promise<Campaing[]> {
        try {
            const campaingList = await this.campaingRepository.find();
            return campaingList;
        } catch (err) {
            console.log("CampaingService - findAll: ", err);

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error getting campaings',
            }, 500);
        }
    }

    async findAllActives(isBioderma: boolean): Promise<Campaing[]> {
        try {
            const campaingList = await this.campaingRepository.find({
                where: { isDeleted: false, isBiodermaGame: isBioderma },
                order: { createdAt: 'DESC' },
                relations: ["target", "target.city", "target.delegation", "target.colony", "target.chain", "target.position", "target.type"]
            });
            return campaingList;
        } catch (err) {
            console.log("CampaingService - findAllActives: ", err);

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error getting campaings',
            }, 500);
        }
    }

    async create(createDTO: CreateCampaingDTO): Promise<any> {
        try {
            let newCampaing = this.campaingRepository.create({
                name: createDTO.name,
                portrait: createDTO.portrait,
                isActive: true,
                isDeleted: false,
                isBiodermaGame: createDTO.isBiodermaGame
            });

            const campaingTargets = await this.targetRepository.findByIds(createDTO.targets);

            newCampaing.target = campaingTargets;

            await this.campaingRepository.save(newCampaing);

            return { status: 0 };
        } catch (err) {
            console.log("CampaingService - create: ", err);

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error creating campaing',
            }, 500);
        }
    }

}

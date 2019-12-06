import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Campaing } from './campaing.entity';
import { Target } from '../target/target.entity';
import { CreateCampaingDTO, GetCampaingsByUserDTO } from './campaing.dto';

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

    async findTopCampaing(campaingId: number): Promise<any> {
        try {
            const response = await this.campaingRepository.findOne(campaingId, {
                relations: ["quizz", "quizz.user", "quizz.user.chain"]
            });
            return response;
        } catch (err) {
            console.log("CampaingService - findTopCampaing: ", err);

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error getting campaings',
            }, 500);
        }
    }

    async findCampaingsByUser(getCampaingsByUserDTO: GetCampaingsByUserDTO): Promise<any> {
        try {
            const response = await this.campaingRepository.createQueryBuilder("campaing")
                .select("campaing.id", "id")
                .distinct(true)
                .addSelect("campaing.name", "name")
                .addSelect("campaing.portrait", "portrait")
                .addSelect("campaing.isBiodermaGame", "type")
                .innerJoin("campaing.quizz", "quizz", "quizz.isActive = :isActive", { isActive: true })
                .innerJoin("quizz.user", "user", "user.email = :email", { email: getCampaingsByUserDTO.email })
                // .where("campaing.isBiodermaGame = :isBiodermaGame", { isBiodermaGame: getCampaingsByUserDTO.isBiodermaGame })
                .getRawMany();
            return { campaings: response };
        } catch (err) {
            console.log("CampaingService - findCampaingsByUser: ", err);

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

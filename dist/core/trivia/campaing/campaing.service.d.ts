import { Repository } from 'typeorm';
import { Campaing } from './campaing.entity';
import { Target } from '../target/target.entity';
import { CreateCampaingDTO, GetCampaingsByUserDTO } from './campaing.dto';
export declare class CampaingService {
    private campaingRepository;
    private targetRepository;
    constructor(campaingRepository: Repository<Campaing>, targetRepository: Repository<Target>);
    findAll(): Promise<Campaing[]>;
    findAllActives(isBioderma: boolean): Promise<Campaing[]>;
    findTopCampaing(campaingId: number): Promise<any>;
    findCampaingsByUser(getCampaingsByUserDTO: GetCampaingsByUserDTO): Promise<any>;
    create(createDTO: CreateCampaingDTO): Promise<any>;
}

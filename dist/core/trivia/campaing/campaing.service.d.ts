import { Repository } from 'typeorm';
import { Campaing } from './campaing.entity';
import { Target } from '../target/target.entity';
import { User } from '../../users/user/user.entity';
import { CreateCampaingDTO, GetCampaingsByUserDTO, GetUserCampaingHistory, RemoveCampaingDTO, UpdateCampaingDTO } from './campaing.dto';
export declare class CampaingService {
    private campaingRepository;
    private targetRepository;
    private userRepository;
    constructor(campaingRepository: Repository<Campaing>, targetRepository: Repository<Target>, userRepository: Repository<User>);
    findAll(): Promise<Campaing[]>;
    findAllActives(isBioderma: boolean): Promise<Campaing[]>;
    findTopCampaing(campaingId: number): Promise<any>;
    findCampaingsByUser(getCampaingsByUserDTO: GetCampaingsByUserDTO): Promise<any>;
    create(createDTO: CreateCampaingDTO): Promise<any>;
    update(updateDTO: UpdateCampaingDTO): Promise<any>;
    getCampaingUserHistoy(requestDTO: GetUserCampaingHistory): Promise<any>;
    delete(removeCampaingDTO: RemoveCampaingDTO): Promise<any>;
}

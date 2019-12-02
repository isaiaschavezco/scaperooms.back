import { CampaingService } from './campaing.service';
import { Campaing } from './campaing.entity';
import { CreateCampaingDTO, GetCampaingsByUserDTO } from './campaing.dto';
export declare class CampaingController {
    private campaingService;
    constructor(campaingService: CampaingService);
    getAllCampaings(): Promise<Campaing[]>;
    getAllActiveCampaings(isBioderma: any): Promise<Campaing[]>;
    getCampaingTop(campaingId: any): Promise<any>;
    findCampaingsByUser(getCampaingsByUserDTO: GetCampaingsByUserDTO): Promise<any>;
    createCampaing(createCampaingDTO: CreateCampaingDTO): Promise<any>;
}

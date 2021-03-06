import { CampaingService } from './campaing.service';
import { Campaing } from './campaing.entity';
import { CreateCampaingDTO, GetCampaingsByUserDTO, GetUserCampaingHistory, RemoveCampaingDTO, UpdateCampaingDTO } from './campaing.dto';
export declare class CampaingController {
    private campaingService;
    constructor(campaingService: CampaingService);
    getAllCampaings(): Promise<Campaing[]>;
    getAllActiveCampaings(isBioderma: any): Promise<Campaing[]>;
    getCampaingReport(campaingId: any): Promise<Campaing[]>;
    getCampaingTop(campaingId: any): Promise<any>;
    updateCampaing(updateCampaingDTO: UpdateCampaingDTO): Promise<any>;
    findCampaingsByUser(getCampaingsByUserDTO: GetCampaingsByUserDTO): Promise<any>;
    createCampaing(createCampaingDTO: CreateCampaingDTO): Promise<any>;
    getUserCampaingHistory(getUserCampaingHistory: GetUserCampaingHistory): Promise<any>;
    deleteCampaing(removeCampaingDTO: RemoveCampaingDTO): Promise<any>;
}

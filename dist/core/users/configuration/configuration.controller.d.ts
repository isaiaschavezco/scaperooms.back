import { ConfigutarionService } from './configuration.service';
import { UpdateClubStatusDTO, UpdateThemeDTO, UpdateBiodermaGameStatusDTO, UpdateBiodermaGameImageDTO, UpdateBiodermaGameCampaingImageDTO, UpdateBiodermaGameBlogImageDTO } from './configuration.dto';
export declare class ConfigutarionController {
    private configutarionService;
    constructor(configutarionService: ConfigutarionService);
    findGeneralConfiguration(): Promise<any>;
    findClubStatus(): Promise<any>;
    updateClubBiodermaStatus(updateClubStatusDTO: UpdateClubStatusDTO): Promise<any>;
    findThemeColor(): Promise<any>;
    updateThemeColor(updateThemeDTO: UpdateThemeDTO): Promise<any>;
    findBiodermaGameStatus(): Promise<any>;
    updateBiodermaStatus(updateBiodermaGameStatusDTO: UpdateBiodermaGameStatusDTO): Promise<any>;
    findBiodermaGameImage(): Promise<any>;
    updateBiodermaImage(updateBiodermaGameImageDTO: UpdateBiodermaGameImageDTO): Promise<any>;
    updateBiodermaCampaignImage(updateBiodermaGameCampaingImageDTO: UpdateBiodermaGameCampaingImageDTO): Promise<any>;
    updateBiodermaBlogImage(updateBiodermaGameBlogImageDTO: UpdateBiodermaGameBlogImageDTO): Promise<any>;
}

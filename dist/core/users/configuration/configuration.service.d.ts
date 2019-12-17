import { Repository } from 'typeorm';
import { Configuration } from './configuration.entity';
import { UpdateClubStatusDTO, UpdateThemeDTO, UpdateBiodermaGameStatusDTO, UpdateBiodermaGameImageDTO } from './configuration.dto';
export declare class ConfigutarionService {
    private configurationRepository;
    constructor(configurationRepository: Repository<Configuration>);
    findGeneralConfiguration(): Promise<any>;
    findClubStatus(): Promise<any>;
    findThemeColor(): Promise<any>;
    findBiodermaGameStatus(): Promise<any>;
    findBiodermaGameImage(): Promise<any>;
    updateClub(updateClubStatusDTO: UpdateClubStatusDTO): Promise<any>;
    updateTheme(updateThemeDTO: UpdateThemeDTO): Promise<any>;
    updateBiodermaGame(updateBiodermaGameStatusDTO: UpdateBiodermaGameStatusDTO): Promise<any>;
    updateBiodermaGameImage(updateBiodermaGameImageDTO: UpdateBiodermaGameImageDTO): Promise<any>;
}

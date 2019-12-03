import { ConfigutarionService } from './configuration.service';
export declare class ConfigutarionController {
    private configutarionService;
    constructor(configutarionService: ConfigutarionService);
    findClubStatus(): Promise<any>;
    findThemeColor(): Promise<any>;
}

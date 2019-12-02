import { Repository } from 'typeorm';
import { Configuration } from './configuration.entity';
export declare class ConfigutarionService {
    private configurationRepository;
    constructor(configurationRepository: Repository<Configuration>);
}

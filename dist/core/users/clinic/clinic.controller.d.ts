import { ClinicService } from './clinic.service';
import { CreateClinicDTO } from './clinic.dto';
export declare class ClinicController {
    private clinicService;
    constructor(clinicService: ClinicService);
    findAll(): Promise<any>;
    create(createDTO: CreateClinicDTO): Promise<number>;
    delete(id: any): Promise<number>;
}

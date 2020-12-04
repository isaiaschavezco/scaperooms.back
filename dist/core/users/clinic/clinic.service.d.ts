import { Repository } from 'typeorm';
import { Clinic } from './clinic.entity';
import { CreateClinicDTO } from './clinic.dto';
export declare class ClinicService {
    private clinicRepository;
    constructor(clinicRepository: Repository<Clinic>);
    findAll(): Promise<any>;
    create(createDTO: CreateClinicDTO): Promise<number>;
    delete(clinicId: number): Promise<number>;
}

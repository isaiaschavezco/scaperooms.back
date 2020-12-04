import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Clinic } from './clinic.entity';
import { CreateClinicDTO} from './clinic.dto';

@Injectable()
export class ClinicService {
    constructor(@InjectRepository(Clinic) private clinicRepository: Repository<Clinic>) { }

    async findAll(): Promise<any> {
        try {
            const clinicList = await this.clinicRepository.find({
                where: { isDeleted: false },
                order: {
                    name: "ASC"
                }
            });
            return { clinics: clinicList };
        } catch (err) {
            console.log("ClinicService - findAll: ", err);
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error getting clinics',
            }, 500);
        }
    }

    async create(createDTO: CreateClinicDTO): Promise<number> {
        try {
            let status = 0;
            let clinic = await this.clinicRepository.findOne({ where: { name: createDTO.name, isDeleted: false } });
            if (clinic) {
                status = 2;
            } else {
                let newClinic = this.clinicRepository.create({
                    name: createDTO.name,
                    isDeleted: createDTO.isDeleted
                });
                await this.clinicRepository.save(newClinic);
                status = 1;
            }
            return status;
        } catch (err) {
            console.log("ClinicService - create: ", err);

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error verifying token',
            }, 500);
        }
    }

    async delete(clinicId: number): Promise<number> {
        try {
            let clinicToUpdate = await this.clinicRepository.findOne(clinicId);
            clinicToUpdate.isDeleted = true;
            await this.clinicRepository.save(clinicToUpdate);
            return 1;
        } catch (err) {
            console.log("ClinicService - delete: ", err);

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error verifying token',
            }, 500);
        }
    }

}
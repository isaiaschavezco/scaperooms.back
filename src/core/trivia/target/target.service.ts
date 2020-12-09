import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Target } from './target.entity';
import { City } from '../../users/city/city.entity';
import { Delegation } from '../../users/delegation/delegation.entity';
import { Chain } from '../../users/chain/chain.entity';
import { Type } from '../../users/type/type.entity';
import { Position } from '../../users/position/position.entity';
import { Role } from '../../users/role/role.entity';
import { CreateTargetDTO, DeleteTargetDTO } from './target.dto';
import { Clinic } from './../../users/clinic/clinic.entity';

@Injectable()
export class TargetService {

    constructor(@InjectRepository(Target) private targetRepository: Repository<Target>,
        @InjectRepository(City) private cityRepository: Repository<City>,
        @InjectRepository(Chain) private chainRepository: Repository<Chain>,
        @InjectRepository(Clinic) private clinicRepository: Repository<Clinic>,

        @InjectRepository(Type) private typeRepository: Repository<Type>,
        @InjectRepository(Position) private positionRepository: Repository<Position>,
        @InjectRepository(Role) private roleRepository: Repository<Role>,
        @InjectRepository(Delegation) private delegationRepository: Repository<Delegation>) { }

    async findAllTargets(): Promise<Target[]> {
        try {
            const targetslist = await this.targetRepository.find();
            return targetslist;
        } catch (err) {
            console.log("TargetService - findAll: ", err);

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error getting targets',
            }, 500);
        }
    }

    async create(createDTO: CreateTargetDTO): Promise<any> {
        try {

            let stateTargetData = null;
            if (createDTO.state !== -1) {
                stateTargetData = await this.cityRepository.findOne(createDTO.state);
            }

            let cityTargetData = null;
            if (createDTO.city !== -1) {
                cityTargetData = await this.delegationRepository.findOne(createDTO.city);
            }

            let chainTargetData = null;
            if (createDTO.chain !== -1) {
                chainTargetData = await this.chainRepository.findOne(createDTO.chain);
            }
            let clinicTargetData = null;
            if (createDTO.clinic !== -1) {
                clinicTargetData = await this.clinicRepository.findOne(createDTO.clinic);
            }

            let userTypeTargetData = null;
            let userIsAdmin = null;
            if (createDTO.userType !== -1) {
                if (createDTO.userType == 3) {
                    userIsAdmin = await this.roleRepository.findOne(1);
                } else if (createDTO.userType == 4) {
                    userTypeTargetData = await this.typeRepository.findOne(3);
                }
                else{
                    userTypeTargetData = await this.typeRepository.findOne(createDTO.userType);
                }
            }

            let naosPositionTargetData = null;
            if (createDTO.naosPosition !== -1) {
                naosPositionTargetData = await this.positionRepository.findOne(createDTO.naosPosition);
            }

            let genderTargetData = null;
            if (createDTO.gender !== -1) {
                genderTargetData = createDTO.gender === 0 ? false : true;
            }

            let newTarget = this.targetRepository.create({
                allUsers: createDTO.allUsers,
                initAge: createDTO.initAge !== -1 ? createDTO.initAge : null,
                finalAge: createDTO.finalAge !== -1 ? createDTO.finalAge : null,
                gender: genderTargetData,
                city: stateTargetData,
                delegation: cityTargetData,
                chain: chainTargetData,
                clinic: clinicTargetData,
                position: naosPositionTargetData,
                type: userTypeTargetData,
                role: userIsAdmin
            });

            const targetCreated = await this.targetRepository.save(newTarget);
            return {
                target: {
                    id: targetCreated.id,
                    initAge: targetCreated.initAge,
                    finalAge: targetCreated.finalAge,
                    gender: targetCreated.gender,
                    city: targetCreated.city ? targetCreated.city.name : null,
                    delegation: targetCreated.delegation ? targetCreated.delegation.name : null,
                    chain: targetCreated.chain ? targetCreated.chain.name : null,
                    clinic: targetCreated.clinic ? targetCreated.clinic.name : null,
                    position: targetCreated.position ? targetCreated.position.name : null,
                    type: targetCreated.type ? targetCreated.type.name : null,
                    allUsers: targetCreated.allUsers,
                    role: targetCreated.role ? targetCreated.role.name : null
                }
            };

        }catch(err){
            console.log("TargetService - create: ", err);

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error creating target',
            }, 500);
        }
    }

    async delete(deleteDTO: DeleteTargetDTO): Promise<any> {
        try {
            const targetToDelete = await this.targetRepository.findOne(deleteDTO.targetId);
            await this.targetRepository.remove(targetToDelete);

            return { status: 0 };

        } catch (err) {
            console.log("TargetService - create: ", err);

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error creating target',
            }, 500);
        }
    }

}

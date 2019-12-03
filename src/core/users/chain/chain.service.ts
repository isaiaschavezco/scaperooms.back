import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chain } from './chain.entity';
import { CreateChainDTO } from './chain.dto';

@Injectable()
export class ChainService {

    constructor(@InjectRepository(Chain) private chainRepository: Repository<Chain>) { }

    async findAll(): Promise<any> {
        try {
            const chainsList = await this.chainRepository.find({
                where: { isDeleted: false },
                order: {
                    name: "ASC"
                }
            });

            return { chains: chainsList };
        } catch (err) {
            console.log("ChainService - findAll: ", err);

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error getting chains',
            }, 500);
        }
    }

    async create(createDTO: CreateChainDTO): Promise<number> {
        try {
            let status = 0;
            let chain = await this.chainRepository.findOne({ where: { name: createDTO.name, isDeleted: false } });
            if (chain) {
                status = 2;
            } else {
                let newChain = this.chainRepository.create({
                    name: createDTO.name,
                    isDeleted: createDTO.isDeleted
                });
                await this.chainRepository.save(newChain);
                status = 1;
            }
            return status;
        } catch (err) {
            console.log("ChainService - create: ", err);

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error verifying token',
            }, 500);
        }
    }

    async delete(chainId: number): Promise<number> {
        try {
            let chainToUpdate = await this.chainRepository.findOne(chainId);
            chainToUpdate.isDeleted = true;
            await this.chainRepository.save(chainToUpdate);

            return 1;
        } catch (err) {
            console.log("ChainService - delete: ", err);

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error verifying token',
            }, 500);
        }
    }

}
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Submenu } from './submenu.entity';
// import { CreateChainDTO } from './chain.dto';

@Injectable()
export class SubmenuService {

    constructor(@InjectRepository(Submenu) private submenuRepository: Repository<Submenu>) { }

    async findByMenuId(menuId: number): Promise<Submenu[]> {
        return await this.submenuRepository.find({ where: { menu: menuId } });
    }

    async findSubMenuItems(menuId: number): Promise<Submenu[]> {
        const submenuItems = await this.submenuRepository.find({ select: ["id", "name"], where: { menu: menuId } });
        let submenuToReturn = [];
        submenuItems.forEach(submenu => {
            submenuToReturn.push({
                value: submenu.id,
                label: submenu.name.toUpperCase()
            });
        });
        return submenuToReturn;
    }

    // async create(createDTO: CreateChainDTO): Promise<number> {
    //     try {
    //         let status = 0;
    //         let chain = await this.chainRepository.findOne({ where: { name: createDTO.name, isDeleted: false } });
    //         if (chain) {
    //             status = 2;
    //         } else {
    //             let newChain = this.chainRepository.create({
    //                 name: createDTO.name,
    //                 isDeleted: createDTO.isDeleted
    //             });
    //             await this.chainRepository.save(newChain);
    //             status = 1;
    //         }
    //         return status;
    //     } catch (err) {
    //         console.log("ChainService - create: ", err);

    //         throw new HttpException({
    //             status: HttpStatus.INTERNAL_SERVER_ERROR,
    //             error: 'Error verifying token',
    //         }, 500);
    //     }
    // }

    // async delete(chainId: number): Promise<number> {
    //     try {
    //         let chainToUpdate = await this.chainRepository.findOne(chainId);
    //         chainToUpdate.isDeleted = true;
    //         await this.chainRepository.save(chainToUpdate);

    //         return 1;
    //     } catch (err) {
    //         console.log("ChainService - delete: ", err);

    //         throw new HttpException({
    //             status: HttpStatus.INTERNAL_SERVER_ERROR,
    //             error: 'Error verifying token',
    //         }, 500);
    //     }
    // }
}

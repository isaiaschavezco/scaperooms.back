import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Submenu } from './submenu.entity';
import { CreateSubmenuDTO } from './submenu.dto';

@Injectable()
export class SubmenuService {

    constructor(@InjectRepository(Submenu) private submenuRepository: Repository<Submenu>) { }

    async findByMenuId(menuId: number): Promise<Submenu[]> {
        const submenuList = await this.submenuRepository.find({
            where: { menu: menuId },
            order: {
                name: "ASC"
            }
        });
        return submenuList;
    }

    async deleteFile(submenuId: number): Promise<any> {
        try {
            let fileToDelete = await this.submenuRepository.findOne(submenuId);
            fileToDelete.fileName = '';
            fileToDelete.url = '';
            fileToDelete.title = '';
            await this.submenuRepository.save(fileToDelete);

            return { status: 0 };
        } catch (err) {
            console.log("SubmenuService - deleteFile: ", err);

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error deleting file',
            }, 500);
        }
    }

    async findFilesByMenu(menuId: number): Promise<any> {

        let productList = [];

        if (menuId == 1) {
            productList = await this.submenuRepository.find({
                where: { menu: 2 },
                order: {
                    name: "ASC"
                }
            });
        }

        const submenuList = await this.submenuRepository.find({
            where: { menu: menuId },
            order: {
                name: "ASC"
            }
        });

        let listToReturn = [];

        submenuList.forEach(tempFile => {

            let tempPDF = '';

            if (menuId == 1) {
                switch (tempFile.id) {
                    case 2:
                        tempPDF = productList[6].url;
                        break;
                    case 3:
                        tempPDF = productList[5].url;
                        break;
                    case 4:
                        tempPDF = productList[2].url;
                        break;
                    case 5:
                        tempPDF = productList[4].url;
                        break;
                    case 6:
                        tempPDF = productList[3].url;
                        break;
                    case 7:
                        tempPDF = productList[0].url;
                        break;
                    case 8:
                        tempPDF = productList[1].url;
                        break;
                    default:
                        break;
                }
            }

            listToReturn.push({
                id: tempFile.id,
                name: tempFile.name.toUpperCase(),
                pdf: tempFile.url,
                product: tempPDF
            });
        });

        if (menuId == 2) {
            listToReturn.sort(function (a, b) {
                return a.id - b.id;
            });
        }

        return { files: listToReturn };
    }

    async findSubMenuItems(menuId: number): Promise<Submenu[]> {
        const submenuItems = await this.submenuRepository.find({
            select: ["id", "name"], where: { menu: menuId }, order: {
                name: "ASC"
            }
        });
        let submenuToReturn = [];
        submenuItems.forEach(submenu => {
            submenuToReturn.push({
                value: submenu.id,
                label: submenu.name.toUpperCase()
            });
        });
        return submenuToReturn;
    }

    async create(request: CreateSubmenuDTO): Promise<number> {
        try {
            let status = 0;
            const baseURl = "https://bioderma-space.sfo2.cdn.digitaloceanspaces.com/";
            const position = request.fileUrl.indexOf("capacitacion/");
            let submenu = await this.submenuRepository.findOne(request.submenu);
            if (submenu.title !== '') {
                status = 1;
            } else {
                submenu.createdAt = new Date();
                submenu.title = request.title;
                submenu.fileName = request.fileUrl.substring(position, request.fileUrl.length);
                submenu.url = baseURl + request.fileUrl.substring(position, request.fileUrl.length);
                await this.submenuRepository.save(submenu);
            }
            return status;

        } catch (err) {
            console.log("SubmenuService - create: ", err);

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error creating',
            }, 500);
        }
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

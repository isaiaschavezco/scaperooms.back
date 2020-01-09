import { Repository } from 'typeorm';
import { Submenu } from './submenu.entity';
import { CreateSubmenuDTO } from './submenu.dto';
export declare class SubmenuService {
    private submenuRepository;
    constructor(submenuRepository: Repository<Submenu>);
    findByMenuId(menuId: number): Promise<Submenu[]>;
    deleteFile(submenuId: number): Promise<any>;
    findFilesByMenu(menuId: number): Promise<any>;
    findSubMenuItems(menuId: number): Promise<Submenu[]>;
    create(request: CreateSubmenuDTO): Promise<number>;
}

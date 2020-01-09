import { SubmenuService } from './submenu.service';
import { Submenu } from './submenu.entity';
import { CreateSubmenuDTO } from './submenu.dto';
export declare class SubmenuController {
    private submenuService;
    constructor(submenuService: SubmenuService);
    findByMenuId(id: any): Promise<Submenu[]>;
    findFilesByMenu(id: any): Promise<any>;
    findSubMenuItems(id: any): Promise<Submenu[]>;
    create(createSubmenuDTO: CreateSubmenuDTO): Promise<number>;
    deleteFile(id: any): Promise<any>;
}

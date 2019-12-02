import { Menu } from '../menu/menu.entity';
export declare class Submenu {
    id: number;
    name: string;
    title: string;
    fileName: string;
    url: string;
    createdAt: Date;
    menu: Menu;
}

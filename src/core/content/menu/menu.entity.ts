import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Submenu } from '../submenu/submenu.entity';

@Entity({ schema: 'Content' })
export class Menu {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    name: string;

    @OneToMany(type => Submenu, submenu => submenu.menu)
    submenu: Submenu[];

}
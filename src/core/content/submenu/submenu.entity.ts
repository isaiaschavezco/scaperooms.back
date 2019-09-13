import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Menu } from '../menu/menu.entity';
import { File } from '../file/file.entity';

@Entity({ schema: 'Content' })
export class Submenu {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    name: string;

    @ManyToOne(type => Menu, menu => menu.submenu)
    menu: Menu;

    @OneToMany(type => File, file => file.submenu)
    file: File[];

}
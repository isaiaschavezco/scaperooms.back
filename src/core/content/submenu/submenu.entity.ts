import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Menu } from '../menu/menu.entity';

@Entity({ schema: 'Content' })
export class Submenu {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    name: string;

    @Column({ length: 100 })
    title: string;

    @Column({ length: 250 })
    fileName: string;

    @Column({ length: 500 })
    url: string;

    @Column({ type: "timestamp without time zone", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @ManyToOne(type => Menu, menu => menu.submenu)
    menu: Menu;

}
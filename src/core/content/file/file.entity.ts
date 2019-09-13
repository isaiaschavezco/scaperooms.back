import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Submenu } from '../submenu/submenu.entity';

@Entity({ schema: 'Content' })
export class File {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    title: string;

    @Column({ length: 250 })
    url: string;

    @Column({ type: "text" })
    description: string;

    @ManyToOne(type => Submenu, submenu => submenu.file)
    submenu: Submenu;

}
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'Users' })
export class Configuration {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    isClubBiodermaActive: boolean;

    @Column({ type: "text" })
    themes: string;

}
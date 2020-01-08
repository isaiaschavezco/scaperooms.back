import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'Users' })
export class Configuration {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    isClubBiodermaActive: boolean;

    @Column()
    themes: number;

    @Column()
    isBiodermaGameActive: boolean;

    @Column({ type: "text", nullable: true })
    biodermaGameImage: string;

    @Column({ type: "text", nullable: true })
    biodermaGameCampaingImage: string;

    @Column({ type: "text", nullable: true })
    biodermaGameBlogImage: string;

}
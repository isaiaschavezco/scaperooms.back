import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Pointsbyuser } from '../pointsbyuser/pointsbyuser.entity';

@Entity({ schema: 'Trivia' })
export class PointsType {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    name: string;

    @OneToMany(type => Pointsbyuser, pointsbyuser => pointsbyuser.pointsType)
    pointsbyuser: Pointsbyuser[];

}
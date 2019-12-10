import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Trade } from '../trade/trade.entity';
import { Pointsbyuser } from '../../trivia/pointsbyuser/pointsbyuser.entity';

@Entity({ schema: 'Content' })
export class Product {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    title: string;

    @Column({ length: 250 })
    image: string;

    @Column({ type: "text" })
    description: string;

    @Column({ type: "smallint" })
    points: number;

    @Column()
    isActive: boolean;

    @OneToMany(type => Trade, trade => trade.product)
    trade: Trade[];

    @OneToMany(type => Pointsbyuser, pointsbyuser => pointsbyuser.product)
    pointsbyuser: Pointsbyuser[];

}
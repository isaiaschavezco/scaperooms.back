import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Trade } from '../trade/trade.entity';

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

    @OneToMany(type => Trade, trade => trade.product)
    trade: Trade[];

}
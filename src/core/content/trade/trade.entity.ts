import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Product } from '../product/product.entity';
import { User } from '../../users/user/user.entity';

@Entity({ schema: 'Content' })
export class Trade {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "timestamp without time zone", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @Column()
    isActive: boolean;

    @ManyToOne(type => Product, product => product.trade)
    product: Product;

    @ManyToOne(type => User, user => user.trade)
    user: User;

}

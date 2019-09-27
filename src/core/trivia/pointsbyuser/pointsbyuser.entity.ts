import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { User } from '../../users/user/user.entity';
import { PointsType } from '../points-type/points-type.entity';
import { Quizz } from '../quizz/quizz.entity';
import { Product } from '../../content/product/product.entity';
import { Section } from '../section/section.entity';

@Entity({ schema: 'Trivia' })
export class Pointsbyuser {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    points: number;

    @Column()
    isAdded: boolean;

    @Column({ type: "timestamp without time zone", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @ManyToOne(type => User, user => user.pointsbyuser)
    user: User;

    @ManyToOne(type => PointsType, pointsType => pointsType.pointsbyuser)
    pointsType: PointsType;

    @ManyToOne(type => Quizz, quizz => quizz.pointsbyuser)
    quizz: Quizz;

    @ManyToOne(type => Product, product => product.pointsbyuser)
    product: Product;

    @ManyToOne(type => Section, section => section.pointsbyuser)
    section: Section;

}
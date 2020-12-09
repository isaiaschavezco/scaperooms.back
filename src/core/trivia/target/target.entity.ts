import { Article } from './../../content/article/article.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany } from 'typeorm';
import { City } from '../../users/city/city.entity';
import { Delegation } from '../../users/delegation/delegation.entity';
import { Chain } from '../../users/chain/chain.entity';
import { Position } from '../../users/position/position.entity';
import { Type } from '../../users/type/type.entity';
import { Campaing } from '../campaing/campaing.entity';
import { Role } from '../../users/role/role.entity';
import { Clinic } from '../../users/clinic/clinic.entity';

@Entity({ schema: 'Trivia' })
export class Target {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    initAge: number;

    @Column({ nullable: true })
    finalAge: number;

    @Column({ nullable: true })
    gender: boolean;

    @Column({ nullable: true })
    allUsers: boolean;

    @ManyToOne(type => City, city => city.target)
    city: City;

    @ManyToOne(type => Chain, chain => chain.target)
    chain: Chain;

    @ManyToOne(type => Clinic, clinic => clinic.target)
    clinic: Clinic;
    
    @ManyToOne(type => Position, position => position.target)
    position: Position;

    @ManyToOne(type => Type, tyype => tyype.target)
    type: Type;

    @ManyToOne(type => Role, role => role.target)
    role: Role;

    @ManyToMany(type => Campaing, campaing => campaing.target)
    campaing: Campaing[];

    @ManyToMany(type => Article, article => article.target)
    article: Article[];

    @ManyToOne(type => Delegation, delegation => delegation.target)
    delegation: Delegation;

}
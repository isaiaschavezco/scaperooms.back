import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany } from 'typeorm';
import { City } from '../../users/city/city.entity';
import { Delegation } from '../../users/delegation/delegation.entity';
import { Colony } from '../../users/colony/colony.entity';
import { Chain } from '../../users/chain/chain.entity';
import { Position } from '../../users/position/position.entity';
import { Type } from '../../users/type/type.entity';
import { Campaing } from '../campaing/campaing.entity';

@Entity({ schema: 'Trivia' })
export class Target {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    initAge: number;

    @Column()
    finalAge: number;

    @Column()
    gender: boolean;

    @ManyToOne(type => City, city => city.target)
    city: City;

    @ManyToOne(type => Delegation, delegation => delegation.target)
    delegation: Delegation;

    @ManyToOne(type => Colony, colony => colony.target)
    colony: Colony;

    @ManyToOne(type => Chain, chain => chain.target)
    chain: Chain;

    @ManyToOne(type => Position, position => position.target)
    position: Position;

    @ManyToOne(type => Type, tyype => tyype.target)
    type: Type;

    @ManyToMany(type => Campaing, campaing => campaing.target)
    campaing: Campaing[];

}
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { City } from '../city/city.entity';
import { Colony } from '../colony/colony.entity';
import { User } from '../user/user.entity';

@Entity({ schema: 'Users' })
export class Delegation {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 150 })
    name: string;

    @ManyToOne(type => City, city => city.delegation)
    city: City;

    @OneToMany(type => Colony, colony => colony.delegation)
    colony: Colony[];

    @OneToMany(type => User, user => user.delegation)
    user: User[];

}
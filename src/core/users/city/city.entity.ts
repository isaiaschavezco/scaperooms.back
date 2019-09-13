import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Delegation } from '../delegation/delegation.entity';
import { User } from '../user/user.entity';
import { Target } from '../../trivia/target/target.entity';

@Entity({ schema: 'Users' })
export class City {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    name: string;

    @OneToMany(type => Delegation, delegation => delegation.city)
    delegation: Delegation[];

    @OneToMany(type => User, user => user.city)
    user: User[];

    @OneToMany(type => Target, target => target.city)
    target: Target[];

}
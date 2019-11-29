import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { Delegation } from '../delegation/delegation.entity';
import { User } from '../user/user.entity';

@Entity({ schema: 'Users' })
export class Colony {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 150 })
    name: string;

    @ManyToOne(type => Delegation, delegation => delegation.colony)
    delegation: Delegation;

    @OneToMany(type => User, user => user.colony)
    user: User[];

}
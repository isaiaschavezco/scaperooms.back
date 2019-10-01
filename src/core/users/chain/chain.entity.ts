import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { User } from '../user/user.entity';
import { Target } from '../../trivia/target/target.entity';

@Entity({ schema: 'Users' })
export class Chain {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    name: string;

    @Column()
    isDeleted: boolean;

    @OneToMany(type => User, user => user.chain)
    user: User[];

    @OneToMany(type => Target, target => target.chain)
    target: Target[];

}
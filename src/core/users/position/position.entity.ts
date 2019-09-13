import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { User } from '../user/user.entity';
import { Target } from '../../trivia/target/target.entity';

@Entity({ schema: 'Users' })
export class Position {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    name: string;

    @OneToMany(type => User, user => user.position)
    user: User[];

    @OneToMany(type => Target, target => target.position)
    target: Target[];

}
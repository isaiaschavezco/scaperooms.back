import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { User } from '../user/user.entity';
import { Target } from '../../trivia/target/target.entity';

@Entity({ schema: 'Users' })
export class Clinic {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    name: string;

    @Column()
    isDeleted: boolean;

    @OneToMany(type => User, user => user.clinic)
    user: User[];
    
    @OneToMany(type => Target, target => target.clinic)
    target: Target[];

}
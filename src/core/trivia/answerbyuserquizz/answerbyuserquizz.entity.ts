import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { User } from '../../users/user/user.entity';
import { Quizz } from '../quizz/quizz.entity';

@Entity({ schema: 'Trivia' })
export class Answerbyuserquizz {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "text" })
    answer: string;

    @Column()
    points: number;

    @Column()
    isActive: boolean;

    @ManyToOne(type => User, user => user.answerbyuserquizz)
    user: User;

    @ManyToOne(type => Quizz, quizz => quizz.answerbyuserquizz)
    quizz: Quizz;


}
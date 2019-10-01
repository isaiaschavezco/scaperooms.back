import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { User } from '../../users/user/user.entity';
import { Question } from '../question/question.entity';

@Entity({ schema: 'Trivia' })
export class Answerbyusersection {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "text" })
    answer: string;

    @Column()
    points: number;

    @Column()
    isActive: boolean;

    @ManyToOne(type => User, user => user.answerbyusersection)
    user: User;

    @ManyToOne(type => Question, question => question.answerbyusersection)
    question: Question;


}
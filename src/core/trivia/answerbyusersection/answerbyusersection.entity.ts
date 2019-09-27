import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { User } from '../../users/user/user.entity';
import { Section } from '../section/section.entity';

@Entity({ schema: 'Trivia' })
export class Answerbyusersection {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "text" })
    answer: string;

    @Column()
    points: number;

    @Column()
    isOpened: boolean;

    @ManyToOne(type => User, user => user.answerbyusersection)
    user: User;

    @ManyToOne(type => Section, section => section.answerbyusersection)
    section: Section;


}
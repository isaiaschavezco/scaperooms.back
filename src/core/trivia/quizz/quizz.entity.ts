import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { Target } from '../target/target.entity';
import { Section } from '../section/section.entity';
import { Campaing } from '../campaing/campaing.entity';
import { User } from '../../users/user/user.entity';

@Entity({ schema: 'Trivia' })
export class Quizz {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    name: string;

    @Column({ type: "timestamp without time zone", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @Column({ type: "timestamp without time zone" })
    finishedAt: Date;

    @ManyToOne(type => Target, target => target.quizz)
    target: Target;

    @ManyToMany(type => Section, section => section.question)
    @JoinTable({ name: "sectionsByQuizz" })
    section: Section[];

    @ManyToMany(type => Campaing, campaing => campaing.quizz)
    campaing: Campaing[];

    @ManyToMany(type => User, user => user.quizz)
    @JoinTable({ name: "quizzesByUser" })
    user: User[];

}
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Question } from '../question/question.entity';
import { Campaing } from '../campaing/campaing.entity';
import { User } from '../../users/user/user.entity';
import { Pointsbyuser } from '../pointsbyuser/pointsbyuser.entity';

@Entity({ schema: 'Trivia' })
export class Quizz {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    name: string;

    @Column({ type: "timestamp without time zone", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @Column({ type: "timestamp without time zone", nullable: true })
    startedAt: Date;

    @Column({ type: "timestamp without time zone", nullable: true })
    finishedAt: Date;

    @Column()
    isActive: boolean;

    @Column()
    isDeleted: boolean;

    @Column()
    isSend: boolean;

    @OneToMany(type => Question, question => question.quizz)
    question: Question[];

    @ManyToOne(type => Campaing, campaing => campaing.quizz)
    campaing: Campaing;

    @ManyToMany(type => User, user => user.quizz)
    @JoinTable({ name: "quizzesByUser" })
    user: User[];

    @OneToMany(type => Pointsbyuser, pointsbyuser => pointsbyuser.quizz)
    pointsbyuser: Pointsbyuser[];

}
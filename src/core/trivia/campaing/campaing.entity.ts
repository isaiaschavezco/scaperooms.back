import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { Quizz } from '../quizz/quizz.entity';

@Entity({ schema: 'Trivia' })
export class Campaing {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    name: string;

    @Column({ type: "timestamp without time zone", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @ManyToMany(type => Quizz, quizz => quizz.campaing)
    @JoinTable({ name: "quizzesByCampaing" })
    quizz: Quizz[];

}
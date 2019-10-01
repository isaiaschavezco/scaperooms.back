import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { Quizz } from '../quizz/quizz.entity';
import { Target } from '../target/target.entity';

@Entity({ schema: 'Trivia' })
export class Campaing {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    name: string;

    @Column({ length: 250 })
    portrait: string;

    @Column({ type: "timestamp without time zone", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @Column()
    isActive: boolean;

    @Column()
    isDeleted: boolean;

    @ManyToMany(type => Quizz, quizz => quizz.campaing)
    @JoinTable({ name: "quizzesByCampaing" })
    quizz: Quizz[];

    @ManyToMany(type => Target, target => target.campaing)
    @JoinTable({ name: "targetsByCampaing" })
    target: Target[];

}
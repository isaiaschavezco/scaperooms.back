import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';
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

    @Column()
    isBiodermaGame: boolean;

    @OneToMany(type => Quizz, quizz => quizz.campaing)
    quizz: Quizz[];

    @ManyToMany(type => Target, target => target.campaing)
    @JoinTable({ name: "targetsByCampaing" })
    target: Target[];

}
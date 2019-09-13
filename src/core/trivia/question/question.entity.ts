import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Section} from '../section/section.entity';

@Entity({ schema: 'Trivia' })
export class Question {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "text" })
    content: string;

    @Column({ type: "text" })
    answer: string;

    @Column({ type: "timestamp without time zone", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @ManyToMany(type => Section, section => section.question)
    @JoinTable({ name: "questionsBySection" })
    section: Section[];

}
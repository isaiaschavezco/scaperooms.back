import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Section } from '../section/section.entity';

@Entity({ schema: 'Trivia' })
export class QuestionType {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    name: string;

    @OneToMany(type => Section, section => section.question_type)
    section: Section[];

}
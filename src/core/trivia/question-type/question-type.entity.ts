import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Question } from '../question/question.entity';

@Entity({ schema: 'Trivia' })
export class QuestionType {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    name: string;

    @OneToMany(type => Question, question => question.question_type)
    question: Question[];

}
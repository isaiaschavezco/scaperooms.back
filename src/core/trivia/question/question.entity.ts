import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, ManyToOne, OneToMany } from 'typeorm';
import { Quizz } from '../quizz/quizz.entity';
import { QuestionType } from '../question-type/question-type.entity';
import { Answerbyusersection } from '../answerbyusersection/answerbyusersection.entity';

@Entity({ schema: 'Trivia' })
export class Question {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "text" })
    content: string;

    @Column({ type: "text" })
    answer: string;

    @Column()
    points: number;

    @Column()
    time: number;

    @Column({ type: "timestamp without time zone", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @ManyToOne(type => QuestionType, questionType => questionType.question)
    question_type: QuestionType;

    @ManyToOne(type => Quizz, quizz => quizz.question)
    quizz: Quizz;

    @OneToMany(type => Answerbyusersection, answerbyusersection => answerbyusersection.question)
    answerbyusersection: Answerbyusersection[];

}
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, OneToMany } from 'typeorm';
import { QuestionType } from '../question-type/question-type.entity';
import { Question } from '../question/question.entity';
import { Quizz } from '../quizz/quizz.entity';
import { Pointsbyuser } from '../pointsbyuser/pointsbyuser.entity';
import { Answerbyusersection } from '../answerbyusersection/answerbyusersection.entity';

@Entity({ schema: 'Trivia' })
export class Section {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    points: number;

    @Column()
    time: number;

    @Column({ type: "timestamp without time zone", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @ManyToOne(type => QuestionType, questionType => questionType.section)
    question_type: QuestionType;

    @ManyToMany(type => Question, question => question.section)
    question: Question[];

    @ManyToMany(type => Quizz, quizz => quizz.section)
    quizz: Quizz[];

    @OneToMany(type => Pointsbyuser, pointsbyuser => pointsbyuser.section)
    pointsbyuser: Pointsbyuser[];

    @OneToMany(type => Answerbyusersection, answerbyusersection => answerbyusersection.section)
    answerbyusersection: Answerbyusersection[];

}
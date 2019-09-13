import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany } from 'typeorm';
import { QuestionType } from '../question-type/question-type.entity';
import { Question } from '../question/question.entity';
import { Quizz } from '../quizz/quizz.entity';

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

}
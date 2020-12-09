import { Target } from './../../trivia/target/target.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Tag } from '../tag/tag.entity';

@Entity({ schema: 'Content' })
export class Article {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    title: string;

    @Column({ length: 250 })
    image: string;

    @Column({ length: 100 })
    subtitle: string;

    @Column({ type: "text" })
    galery: string;

    @Column({ type: "text" })
    content: string;

    @Column()
    isBiodermaGame: boolean;

    @Column({ nullable: true })
    isBlogNaos: boolean;

    @Column({ nullable: true })
    isBlogEsthederm: boolean;

    @Column({ nullable: true })
    isAll: boolean;

    @Column({ type: "timestamp without time zone", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @ManyToMany(type => Tag, tag => tag.article)
    @JoinTable({ name: "articlesByTag" })
    tag: Tag[];

    @ManyToMany(type => Target, target => target.article)
    @JoinTable({ name: "targetsByArticle" })
    target: Target[];

}
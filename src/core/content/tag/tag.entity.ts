import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Article } from '../article/article.entity';

@Entity({ schema: 'Content' })
export class Tag {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    name: string;

    @ManyToMany(type => Article, article => article.tag)
    article: Article[];

}
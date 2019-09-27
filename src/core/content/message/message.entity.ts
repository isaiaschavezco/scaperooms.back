import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../../users/user/user.entity';

@Entity({ schema: 'Content' })
export class Message {

    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column({ type: "text" })
    content: string;

    @Column({ type: "timestamp without time zone", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @Column()
    isAdmin: boolean;

    @ManyToOne(type => User, user => user.message)
    user: User;

}
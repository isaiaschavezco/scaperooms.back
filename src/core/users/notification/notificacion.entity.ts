import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { User } from '../user/user.entity';


@Entity({ schema: 'Users' })
export class Notificacion {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 250 })
    header: string;

    @Column({ length: 250 })
    content: string;

    @Column({ type: "timestamp without time zone", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @ManyToMany(type => User, user => user.notificacion)
    @JoinTable({ name: "notificationsByUser" })
    user: User[];

}
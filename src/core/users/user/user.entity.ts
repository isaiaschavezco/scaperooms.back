import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, ManyToMany } from 'typeorm';
import { Type } from '../type/type.entity';
import { City } from '../city/city.entity';
import { Delegation } from '../delegation/delegation.entity';
import { Colony } from '../colony/colony.entity';
import { Position } from '../position/position.entity';
import { Chain } from '../chain/chain.entity';
import { Role } from '../role/role.entity';
import { Trade } from '../../content/trade/trade.entity';
import { Quizz } from '../../trivia/quizz/quizz.entity';
import { Pointsbyuser } from '../../trivia/pointsbyuser/pointsbyuser.entity';
import { Answerbyusersection } from '../../trivia/answerbyusersection/answerbyusersection.entity';
import { Message } from '../../content/message/message.entity';
import { Notificacion } from '../notification/notificacion.entity';
import { Sesion } from '../sesion/sesion.entity';

@Entity({ schema: 'Users' })
export class User {

    @PrimaryGeneratedColumn()
    id: string;

    @Column({ length: 50 })
    name: string;

    @Column({ length: 50 })
    lastName: string;

    @Column({ length: 250 })
    photo: string;

    @Column({ length: 250 })
    nickname: string;

    @Column({ type: "timestamp without time zone" })
    birthDate: Date;

    @Column()
    gender: boolean;

    @Column({ length: 15 })
    phone: string;

    @Column({ length: 250 })
    email: string;

    @Column({ length: 250 })
    drugstore: string;

    @Column({ length: 250 })
    street: string;

    @Column({ length: 100 })
    password: string;

    @Column({ type: "timestamp without time zone", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @Column()
    isActive: boolean;

    @Column()
    points: number;

    @Column()
    age: number;

    @ManyToOne(type => City, city => city.user)
    city: City;

    @ManyToOne(type => Delegation, delegation => delegation.user)
    delegation: Delegation;

    @ManyToOne(type => Colony, colony => colony.user)
    colony: Colony;

    @ManyToOne(type => Type, tyype => tyype.user)
    type: Type;

    @ManyToOne(type => Position, position => position.user)
    position: Position;

    @ManyToOne(type => Chain, chain => chain.user)
    chain: Chain;

    @ManyToOne(type => Role, role => role.user)
    role: Role;

    @OneToMany(type => Trade, trade => trade.user)
    trade: Trade[];

    @ManyToMany(type => Quizz, quizz => quizz.user)
    quizz: Quizz[];

    @OneToMany(type => Pointsbyuser, pointsbyuser => pointsbyuser.user)
    pointsbyuser: Pointsbyuser[];

    @OneToMany(type => Answerbyusersection, answerbyusersection => answerbyusersection.user)
    answerbyusersection: Answerbyusersection[];

    @OneToMany(type => Message, message => message.user)
    message: Message[];

    @ManyToMany(type => Notificacion, notificacion => notificacion.user)
    notificacion: Notificacion[];

    @OneToMany(type => Sesion, sesion => sesion.user)
    sesion: Sesion[];

}
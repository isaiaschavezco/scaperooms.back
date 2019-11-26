import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Token } from '../token/token.entity';
import { Type } from '../type/type.entity';
import { InviteUserDTO, CreateUserDTO } from './user.dto';
import { MailerService } from '@nest-modules/mailer';
import * as jwt from "jsonwebtoken";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

    constructor(@InjectRepository(User) private userRepository: Repository<User>,
        private readonly mailerService: MailerService,
        @InjectRepository(Token) private tokenRepository: Repository<Token>,
        @InjectRepository(Type) private typeRepository: Repository<Type>) { }

    async  invite(request: InviteUserDTO): Promise<number> {
        try {

            let status = 0;
            // Se verifica si el usuario ya cuenta con una invitacion enviada
            const token = await this.tokenRepository.findOne({
                where: { email: request.email }
            });

            if (token) {
                await this.tokenRepository.remove(token);
            }
            // Se obtiene el tipo de usuario
            const userType = await this.typeRepository.findOne(request.type);
            // Se crea nuevo token asociado al email del usuario
            let newToken = this.tokenRepository.create({
                email: request.email,
                type: userType
            });
            // Se registra token
            const registerToken = await this.tokenRepository.save(newToken);
            // Se genera jwt para enviar por correo
            const jwtToken = await jwt.sign({ token: registerToken.id }, "Bi0d3rmaTokenJWT.");
            // Se envia correo
            await this.mailerService.sendMail({
                to: request.email,
                subject: 'Has sido invitado a Bioderma.',
                template: 'invitacion',
                context: {
                    url: jwtToken,
                    type: request.type
                },
            });

            return status;

        } catch (err) {
            console.log("UserService - invite: ", err);

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error creating',
            }, 500);
        }
    }

    async findAll(): Promise<User[]> {
        try {
            const usersList = await this.userRepository.find();
            return usersList;
        } catch (err) {
            console.log("UserService - findAll: ", err);

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error getting users',
            }, 500);
        }
    }

    async create(createUserDTO: CreateUserDTO): Promise<any> {
        try {
            const userPassword = await bcrypt.hash(createUserDTO.password, 12);
            const userAge = this.getAge(createUserDTO.birthDate);
            let newUser = await this.userRepository.create({
                name: createUserDTO.name,
                lastName: createUserDTO.lastName,
                photo: createUserDTO.photo,
                nickname: createUserDTO.nickname,
                birthDate: createUserDTO.birthDate,
                gender: createUserDTO.gender,
                phone: createUserDTO.phone,
                email: createUserDTO.email,
                drugstore: createUserDTO.drugStore,
                street: createUserDTO.drugStore,
                password: userPassword,
                isActive: true,
                points: 0,
                age: userAge
            });

            await this.userRepository.save(newUser);

            return { status: 0 };
        } catch (err) {
            console.log("UserService - create: ", err);

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error getting users',
            }, 500);
        }
    }

    private getAge(dateString) {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && (today.getDate() < birthDate.getDate()))) {
            age--;
        }
        return age;
    }

}

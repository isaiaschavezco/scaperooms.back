import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Token } from '../token/token.entity';
import { Type } from '../type/type.entity';
import { InviteUserDTO } from './user.dto';
import { MailerService } from '@nest-modules/mailer';
import * as jwt from "jsonwebtoken";

@Injectable()
export class UserService {

    constructor(@InjectRepository(User) private userRepository: Repository<User>,
        private readonly mailerService: MailerService,
        @InjectRepository(Token) private tokenRepository: Repository<Token>,
        @InjectRepository(Type) private typeRepository: Repository<Type>) { }

    async  create(request: InviteUserDTO): Promise<number> {
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
}

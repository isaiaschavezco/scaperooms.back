import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sesion } from './sesion.entity';
import { User } from '../user/user.entity';
import { ReuestSesionDTO } from './sesion.dto';
import * as bcrypt from 'bcrypt';
import * as moment from 'moment';

@Injectable()
export class SesionService {

    constructor(@InjectRepository(Sesion) private sesionRepository: Repository<Sesion>,
        @InjectRepository(User) private userRepository: Repository<User>) { }

    async RequesLogin(requestDTO: ReuestSesionDTO): Promise<any> {
        try {

            let response = null;
            const user = await this.userRepository.findOne({
                relations: ["type"],
                where: { email: requestDTO.email }
            });

            if (user) {

                const match = await bcrypt.compare(requestDTO.password, user.password);

                if (match) {

                    const sesionExist = await this.sesionRepository.findOne({
                        where: { user: user }
                    });

                    if (sesionExist) {
                        await this.sesionRepository.remove(sesionExist);
                    }

                    const sesion = this.sesionRepository.create({
                        user: user
                    });

                    const loggedUser = await this.sesionRepository.save(sesion);

                    console.log("user: ", user);
                    console.log("sesion: ", loggedUser);

                    const completeName = user.name.split(" ")[0] + " " + user.lastName.split(" ")[0];

                    response = {
                        token: loggedUser.id,
                        name: completeName,
                        nickname: user.nickname,
                        gender: user.gender,
                        image: user.photo,
                        birthday: moment(new Date(user.birthDate)).format('DD-MM-YYYY'),
                        phonenumber: user.phone,
                        email: user.email,
                        type: user.type.id,
                        totalPoints: user.points
                    };

                } else {
                    response = { status: 2 };
                }

            } else {
                response = { status: 1 };
            }

            return response;

        } catch (err) {
            console.log("SesionService - RequesLogin: ", err);

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error requesting login',
            }, 500);
        }
    }

}
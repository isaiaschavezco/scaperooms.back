import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sesion } from './sesion.entity';
import { User } from '../user/user.entity';
import { Configuration } from '../configuration/configuration.entity';
import { ReuestSesionDTO, UpdatePlayerID, ReuestSesionLogOutDTO } from './sesion.dto';
import { Notificacion } from '../notification/notificacion.entity';
import * as bcrypt from 'bcrypt';
import * as moment from 'moment';

@Injectable()
export class SesionService {

    constructor(@InjectRepository(Sesion) private sesionRepository: Repository<Sesion>,
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Configuration) private configurationRepository: Repository<Configuration>,
        @InjectRepository(Notificacion) private notificationRepository: Repository<Notificacion>) { }

    async RequesLogin(requestDTO: ReuestSesionDTO): Promise<any> {
        try {

            let response = null;
            let user = await this.userRepository.findOne({
                relations: ["type", "chain", "city", "delegation", "position"],
                where: { email: requestDTO.email, isActive: true }
            });

            if (user) {

                // console.log("requestDTO.password: ", requestDTO.password);

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

                    const userNotifications = await this.notificationRepository.createQueryBuilder("not")
                        .select(["not.id"])
                        .innerJoin("not.user", "user", "user.email = :email", { email: requestDTO.email })
                        .orderBy("not.id", "DESC")
                        .limit(10)
                        .getMany();

                    const loggedUser = await this.sesionRepository.save(sesion);
                    const generalConfiguration = await this.configurationRepository.findOne(1);

                    const newUserAge = this.getAge(moment(new Date(user.birthDate)).format('DD-MM-YYYY'));

                    // console.log("newUserAge: ", newUserAge);

                    user.age = isNaN(newUserAge) ? 0 : newUserAge;
                    user.notificacion = userNotifications;
                    await this.userRepository.save(user);

                    response = {
                        profile: {
                            token: loggedUser.id,
                            name: user.name,
                            lastName: user.lastName,
                            nickname: user.nickname,
                            gender: user.gender,
                            image: user.photo,
                            birthday: moment(new Date(user.birthDate)).format('DD-MM-YYYY'),
                            phonenumber: user.phone,
                            email: user.email,
                            type: user.type.id,
                            totalPoints: user.points,
                            address: {
                                state: user.city,
                                city: user.delegation,
                                mayoralty: user.mayoralty,
                                suburb: user.town
                            },
                            workPosition: user.position,
                            statusCart: generalConfiguration.isClubBiodermaActive,
                            branchChain: user.chain,
                            branchOffice: user.drugstore,
                            postalCode: user.postalCode,
                            charge: user.charge,
                            isActiveCart: user.type.id === 1 ? false : true,
                            countNotifications: userNotifications.length,
                            totalBiodermaGames: user.biodermaGamePoints ? user.biodermaGamePoints : 0
                        }
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

    async SetPlayerID(updatePlayerID: UpdatePlayerID): Promise<any> {
        try {

            let response = null;

            const userExist = await this.userRepository.findOne({
                where: { email: updatePlayerID.email }
            });

            if (userExist) {
                let actualSesion = await this.sesionRepository.findOne({
                    where: { user: userExist }
                });

                if (actualSesion) {

                    actualSesion.playerId = updatePlayerID.playerId;
                    await this.sesionRepository.save(actualSesion);
                    response = { status: 0 };

                } else {
                    response = { status: 6 };
                }

            } else {
                response = { status: 1 };
            }


            return response;

        } catch (err) {
            console.log("SesionService - SetPlayerID: ", err);

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error setting playerId',
            }, 500);
        }
    }

    async RequesLogout(reuestSesionLogOutDTO: ReuestSesionLogOutDTO): Promise<any> {
        try {

            let response = null;
            const user = await this.userRepository.findOne({
                where: { email: reuestSesionLogOutDTO.email }
            });

            if (user) {

                let actualSesion = await this.sesionRepository.findOne({
                    where: { user: user }
                });

                await this.sesionRepository.remove(actualSesion);

                response = { status: 0 };

            } else {
                response = { status: 1 };
            }

            return response;

        } catch (err) {
            console.log("SesionService - RequesLogout: ", err);

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error requesting logout',
            }, 500);
        }
    }

    async RequesLoginAdmin(requestDTO: ReuestSesionDTO): Promise<any> {
        try {

            let response = null;
            const user = await this.userRepository.findOne({
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
                    const completeName = user.name.split(" ")[0] + " " + user.lastName.split(" ")[0];

                    response = {
                        profile: {
                            token: loggedUser.id,
                            name: completeName,
                            image: user.photo,
                            email: user.email
                        }
                    };

                } else {
                    response = { status: 2 };
                }

            } else {
                response = { status: 1 };
            }

            return response;

        } catch (err) {
            console.log("SesionService - RequesLoginAdmin: ", err);

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error requesting login',
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
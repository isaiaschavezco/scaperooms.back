import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Token } from '../token/token.entity';
import { Type } from '../type/type.entity';
import { Chain } from '../chain/chain.entity';
import { City } from '../city/city.entity';
import { Delegation } from '../delegation/delegation.entity';
import { Position } from '../position/position.entity';
import { Role } from '../role/role.entity';
import { Quizz } from '../../trivia/quizz/quizz.entity';
import { Target } from '../../trivia/target/target.entity';
import { Campaing } from '../../trivia/campaing/campaing.entity';
import { Sesion } from '../sesion/sesion.entity';
import { Configuration } from '../configuration/configuration.entity';
import { InviteUserDTO, CreateUserDTO, CreateNAOSUserDTO, CreateDrugStoreUserDTO, UpdateNAOSUserDTO, UpdateDrugStoreUserDTO, ConfirmUserPassword, PasswordRecovery } from './user.dto';
import { MailerService } from '@nest-modules/mailer';
import * as jwt from "jsonwebtoken";
import * as bcrypt from 'bcrypt';
import * as moment from 'moment';

@Injectable()
export class UserService {

    constructor(@InjectRepository(User) private userRepository: Repository<User>,
        private readonly mailerService: MailerService,
        @InjectRepository(Campaing) private campaingRepository: Repository<Campaing>,
        @InjectRepository(Quizz) private quizzRepository: Repository<Quizz>,
        @InjectRepository(Target) private targetRepository: Repository<Target>,
        @InjectRepository(Token) private tokenRepository: Repository<Token>,
        @InjectRepository(Type) private typeRepository: Repository<Type>,
        @InjectRepository(Chain) private chainRepository: Repository<Chain>,
        @InjectRepository(Position) private positionRepository: Repository<Position>,
        @InjectRepository(City) private stateRepository: Repository<City>,
        @InjectRepository(Delegation) private cityRepository: Repository<Delegation>,
        @InjectRepository(Role) private roleRepository: Repository<Role>,
        @InjectRepository(Sesion) private sesionRepository: Repository<Sesion>,
        @InjectRepository(Configuration) private configurationRepository: Repository<Configuration>) { }

    async  invite(request: InviteUserDTO): Promise<number> {
        try {

            let status = 0;

            // Se verifica si el usuario ya cuenta con una invitacion enviada
            let userExist = await this.userRepository.findOne({
                where: { email: request.email }
            });

            if (!userExist) {

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
                        type: request.type,
                        email: request.email
                    },
                });

            } else {

                if (userExist.isActive) {
                    status = 9;
                } else {
                    status = 8;
                    userExist.isActive = true;
                    await this.userRepository.save(userExist);
                }
            }

            return status;

        } catch (err) {
            console.log("UserService - invite: ", err);

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error invitins user',
            }, 500);
        }
    }

    async findAll(): Promise<any> {
        try {
            const usersList = await this.userRepository.find({
                select: ["id", "name", "email", "points"],
                relations: ["position", "type"],
                where: { isActive: true }
            });
            return { users: usersList };
        } catch (err) {
            console.log("UserService - findAll: ", err);

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error getting users list',
            }, 500);
        }
    }

    async confirmPassword(requestDTO: ConfirmUserPassword): Promise<any> {
        try {
            let response = { status: 0 };

            const userExist = await this.userRepository.findOne({
                where: { email: requestDTO.email },
                select: ["id", "name", "email", "points", "password"]
            });

            if (userExist) {
                const match = await bcrypt.compare(requestDTO.password, userExist.password);

                if (!match) {
                    response = { status: 2 };
                }

            } else {
                response = { status: 1 };
            }

            return response;
        } catch (err) {
            console.log("UserService - confirmPassword: ", err);

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error confirming user password',
            }, 500);
        }
    }

    async findUserDetail(requestEmail: string): Promise<any> {
        try {
            const user = await this.userRepository.findOne({
                relations: ["type", "chain", "city", "delegation", "position"],
                where: { email: requestEmail }
            });

            return {
                profile: {
                    id: user.id,
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
                    branchChain: user.chain,
                    branchOffice: user.drugstore,
                    postalCode: user.postalCode,
                    charge: user.charge,
                    biodermaGamePoints: user.biodermaGamePoints
                }
            };
        } catch (err) {
            console.log("UserService - findUserDetail: ", err);

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error getting user',
            }, 500);
        }
    }

    async create(createUserDTO: CreateUserDTO): Promise<any> {
        try {

            const userPassword = await bcrypt.hash(createUserDTO.password, 12);
            const userAge = this.getAge(createUserDTO.birthDate);

            const userChain = await this.chainRepository.findOne(createUserDTO.chain);

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
                postalCode: createUserDTO.drugStore,
                password: userPassword,
                chain: userChain,
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

    async createNAOS(createNAOSUserDTO: CreateNAOSUserDTO): Promise<any> {
        try {

            let response = {status:0};
            const userAge = this.getAge(createNAOSUserDTO.birthDate);
            console.clear();
            console.log("User->", createNAOSUserDTO);
            
            const quizz = await this.quizzRepository.find({
                
            });

            const quizzes = await this.targetRepository.createQueryBuilder("target")
            .select("target.id", "id")
            .where("target.allUsers")
            .orWhere(":age between target.initAge and target.finalAge", { age: userAge })
            .orWhere("target.gender = :gender", { gender: createNAOSUserDTO.gender })
            .orWhere("target.city = :city", { city: createNAOSUserDTO.city })
            .orWhere("target.position = :position", { position: createNAOSUserDTO.naosPosition })
            .orWhere("target.type = :type", { type: 1 })
            //.orWhere("target.chain = :chain", { chain: 0 })
            .innerJoinAndSelect("target.campaing", "campaing")
            .innerJoinAndSelect("campaing.quizz", "quizz")
            .where("quizz.isActive")
            .orWhere("quizz.isSend")
            .select("quizz.id", "quizzId")
            .getRawMany();
            /*
            ** select quizz."id" from
            ** (
            **     select campaing."id" from
            **     (
            **         select id
            **         from "Trivia".target as target
            **         where 18 between target."initAge" and target."finalAge"
            **         or target."gender" = true or target."cityId" =  1 or target."chainId" =  1 or target."cityId" =  1 or target."positionId" = 1 or target."typeId" = 1
            **     ) as filter
            **     inner join "Trivia".campaing as campaing on campaing."id" = filter."id"
            ** ) as campaing
            ** inner join "Trivia".quizz as quizz
            ** on quizz."campaingId" = campaing."id" and quizz."isActive" and quizz."isSend" and quizz."startedAt" <= to_timestamp('05 Dec 2000', 'DD Mon YYYY') and to_timestamp('05 Dec 2000', 'DD Mon YYYY') <= quizz."finishedAt";
            */

            let quizzesEntities = await this.quizzRepository.find({
                select: ['id'],
                where: {
                    quizzes
                }
            });
            console.log("Quizz:", quizzesEntities);
            const userExist = await this.userRepository.findOne({
                where: { email: createNAOSUserDTO.email }
            });

            if (userExist) {

                response = { status: 5 };

            } else {

                const userPassword = await bcrypt.hash(createNAOSUserDTO.password, 12);
                const userAge = this.getAge(createNAOSUserDTO.birthDate);

                const naosPosition = await this.positionRepository.findOne(createNAOSUserDTO.naosPosition);
                const userState = await this.stateRepository.findOne(createNAOSUserDTO.state);
                const userCity = await this.cityRepository.findOne(createNAOSUserDTO.city);
                const userType = await this.typeRepository.findOne(1);
                const userRole = await this.roleRepository.findOne(2);

                let newUser = await this.userRepository.create({
                    name: createNAOSUserDTO.name,
                    lastName: createNAOSUserDTO.lastName,
                    photo: createNAOSUserDTO.photo,
                    birthDate: createNAOSUserDTO.birthDate,
                    gender: createNAOSUserDTO.gender,
                    phone: createNAOSUserDTO.phone,
                    email: createNAOSUserDTO.email,
                    nickname: createNAOSUserDTO.nickName,
                    password: userPassword,
                    position: naosPosition,
                    isActive: true,
                    city: userState,
                    delegation: userCity,
                    points: 0,
                    biodermaGamePoints: 0,
                    age: userAge,
                    type: userType,
                    role: userRole
                });

                console.log("Save data");
                
                newUser.quizz = quizzesEntities;
                newUser = await this.userRepository.save(newUser);

                 response = { status: 0 }

            }

             return response;
        } catch (err) {
            console.log("UserService - createNAOS: ", err);

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error creating NAOS user',
            }, 500);
        }
    }

    async createDrugStore(createDrugStoreUserDTO: CreateDrugStoreUserDTO): Promise<any> {
        try {

            let response = null;

            const userExist = await this.userRepository.findOne({
                where: { email: createDrugStoreUserDTO.email }
            });

            if (userExist) {

                response = { status: 5 };

            } else {

                const userPassword = await bcrypt.hash(createDrugStoreUserDTO.password, 12);
                const userAge = this.getAge(createDrugStoreUserDTO.birthDate);

                const userState = await this.stateRepository.findOne(createDrugStoreUserDTO.state);
                const userCity = await this.cityRepository.findOne(createDrugStoreUserDTO.city);
                const userType = await this.typeRepository.findOne(2);
                const userChain = await this.chainRepository.findOne(createDrugStoreUserDTO.chain);
                const userRole = await this.roleRepository.findOne(2);

                let newUser = await this.userRepository.create({
                    name: createDrugStoreUserDTO.name,
                    lastName: createDrugStoreUserDTO.lastName,
                    nickname: createDrugStoreUserDTO.nickName,
                    photo: createDrugStoreUserDTO.photo,
                    birthDate: createDrugStoreUserDTO.birthDate,
                    gender: createDrugStoreUserDTO.gender,
                    phone: createDrugStoreUserDTO.phone,
                    email: createDrugStoreUserDTO.email,
                    postalCode: createDrugStoreUserDTO.postalCode,
                    drugstore: createDrugStoreUserDTO.drugStore,
                    password: userPassword,
                    chain: userChain,
                    isActive: true,
                    city: userState,
                    delegation: userCity,
                    points: 0,
                    biodermaGamePoints: 0,
                    age: userAge,
                    type: userType,
                    town: createDrugStoreUserDTO.town,
                    charge: createDrugStoreUserDTO.charge,
                    mayoralty: createDrugStoreUserDTO.mayoralty,
                    role: userRole
                });

                await this.userRepository.save(newUser);

                response = { status: 0 }

            }

            return response;
        } catch (err) {
            console.log("UserService - createDrugStore: ", err);

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error creating Drugstore user',
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

    async updateNAOS(updateNAOSUserDTO: UpdateNAOSUserDTO): Promise<any> {
        try {

            let response = null;

            let userExist = await this.userRepository.findOne({
                relations: ["city", "delegation", "position"],
                where: { email: updateNAOSUserDTO.userId }
            });

            if (!userExist) {

                response = { status: 1 };

            } else {

                if (updateNAOSUserDTO.name) {
                    userExist.name = updateNAOSUserDTO.name;
                }

                if (updateNAOSUserDTO.lastName) {
                    userExist.lastName = updateNAOSUserDTO.lastName;
                }

                if (updateNAOSUserDTO.photo) {
                    userExist.photo = updateNAOSUserDTO.photo;
                }

                if (updateNAOSUserDTO.nickname) {
                    userExist.nickname = updateNAOSUserDTO.nickname;
                }

                if (updateNAOSUserDTO.birthDate) {
                    userExist.birthDate = new Date(updateNAOSUserDTO.birthDate);
                    const userAge = this.getAge(updateNAOSUserDTO.birthDate);
                    userExist.age = userAge;
                }

                if (typeof updateNAOSUserDTO.gender !== "undefined") {
                    userExist.gender = updateNAOSUserDTO.gender;
                }

                if (updateNAOSUserDTO.phone) {
                    userExist.phone = updateNAOSUserDTO.phone;
                }

                if (updateNAOSUserDTO.naosPosition) {
                    const naosPosition = await this.positionRepository.findOne(updateNAOSUserDTO.naosPosition);
                    userExist.position = naosPosition;
                }

                if (updateNAOSUserDTO.state) {
                    const userState = await this.stateRepository.findOne(updateNAOSUserDTO.state);
                    userExist.city = userState;
                }

                if (updateNAOSUserDTO.city) {
                    const userCity = await this.cityRepository.findOne(updateNAOSUserDTO.city);
                    userExist.delegation = userCity;
                }

                userExist.isActive = true;

                await this.userRepository.save(userExist);

                const userToReturn = await this.userRepository.findOne({
                    relations: ["type", "chain", "city", "delegation", "position", "notificacion"],
                    where: { email: userExist.email }
                });

                const loggedUser = await this.sesionRepository.findOne({
                    where: { user: userToReturn }
                });

                const generalConfiguration = await this.configurationRepository.findOne(1);

                response = {

                    user: {
                        token: loggedUser.id,
                        name: userToReturn.name,
                        lastName: userToReturn.lastName,
                        nickname: userToReturn.nickname,
                        gender: userToReturn.gender,
                        image: userToReturn.photo,
                        birthday: moment(new Date(userToReturn.birthDate)).format('DD-MM-YYYY'),
                        phonenumber: userToReturn.phone,
                        email: userToReturn.email,
                        type: userToReturn.type.id,
                        totalPoints: userToReturn.points,
                        address: {
                            state: userToReturn.city,
                            city: userToReturn.delegation,
                            mayoralty: userToReturn.mayoralty,
                            suburb: userToReturn.town
                        },
                        workPosition: userToReturn.position,
                        statusCart: generalConfiguration.isClubBiodermaActive,
                        branchChain: userToReturn.chain,
                        branchOffice: userToReturn.drugstore,
                        postalCode: userToReturn.postalCode,
                        charge: userToReturn.charge,
                        isActiveCart: userToReturn.type.id === 1 ? false : true,
                        countNotifications: userToReturn.notificacion ? userToReturn.notificacion.length : 0,
                        totalBiodermaGames: userToReturn.biodermaGamePoints ? userToReturn.biodermaGamePoints : 0
                    }
                };

            }

            return response;
        } catch (err) {
            console.log("UserService - updateNAOS: ", err);

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error updating NAOS user',
            }, 500);
        }
    }

    async updateDrugStore(updateDrugStoreUserDTO: UpdateDrugStoreUserDTO): Promise<any> {
        try {
            let response = null;

            console.log("updateDrugStoreUserDTO:  ", updateDrugStoreUserDTO);

            let userExist = await this.userRepository.findOne({
                relations: ["city", "delegation", "chain"],
                where: { email: updateDrugStoreUserDTO.userId }
            });

            if (!userExist) {

                response = { status: 1 };

            } else {

                if (updateDrugStoreUserDTO.name) {
                    userExist.name = updateDrugStoreUserDTO.name;
                }

                if (updateDrugStoreUserDTO.lastName) {
                    userExist.lastName = updateDrugStoreUserDTO.lastName;
                }

                if (updateDrugStoreUserDTO.photo) {
                    userExist.photo = updateDrugStoreUserDTO.photo;
                }

                if (updateDrugStoreUserDTO.nickname) {
                    userExist.nickname = updateDrugStoreUserDTO.nickname;
                }

                if (updateDrugStoreUserDTO.birthDate) {
                    const userAge = this.getAge(updateDrugStoreUserDTO.birthDate);
                    userExist.birthDate = new Date(updateDrugStoreUserDTO.birthDate);
                    userExist.age = userAge;
                }

                if (typeof updateDrugStoreUserDTO.gender !== "undefined") {
                    userExist.gender = updateDrugStoreUserDTO.gender;
                }

                if (updateDrugStoreUserDTO.phone) {
                    userExist.phone = updateDrugStoreUserDTO.phone;
                }

                if (updateDrugStoreUserDTO.postalCode) {
                    userExist.postalCode = updateDrugStoreUserDTO.postalCode;
                }

                if (updateDrugStoreUserDTO.chain) {
                    const userChain = await this.chainRepository.findOne(updateDrugStoreUserDTO.chain);
                    userExist.chain = userChain;
                }

                if (updateDrugStoreUserDTO.state) {
                    const userState = await this.stateRepository.findOne(updateDrugStoreUserDTO.state);
                    userExist.city = userState;
                }

                if (updateDrugStoreUserDTO.city) {
                    const userCity = await this.cityRepository.findOne(updateDrugStoreUserDTO.city);
                    userExist.delegation = userCity;
                }


                if (updateDrugStoreUserDTO.drugStore) {
                    userExist.drugstore = updateDrugStoreUserDTO.drugStore;
                }

                if (updateDrugStoreUserDTO.town) {
                    userExist.town = updateDrugStoreUserDTO.town;
                }

                if (updateDrugStoreUserDTO.charge) {
                    userExist.charge = updateDrugStoreUserDTO.charge;
                }

                if (updateDrugStoreUserDTO.mayoralty) {
                    userExist.mayoralty = updateDrugStoreUserDTO.mayoralty;
                }

                userExist.isActive = true;

                await this.userRepository.save(userExist);

                const userToReturn = await this.userRepository.findOne({
                    relations: ["type", "chain", "city", "delegation", "position", "notificacion"],
                    where: { email: userExist.email }
                });

                const loggedUser = await this.sesionRepository.findOne({
                    where: { user: userToReturn }
                });

                const generalConfiguration = await this.configurationRepository.findOne(1);

                response = {

                    user: {
                        token: loggedUser.id,
                        name: userToReturn.name,
                        lastName: userToReturn.lastName,
                        nickname: userToReturn.nickname,
                        gender: userToReturn.gender,
                        image: userToReturn.photo,
                        birthday: moment(new Date(userToReturn.birthDate)).format('DD-MM-YYYY'),
                        phonenumber: userToReturn.phone,
                        email: userToReturn.email,
                        type: userToReturn.type.id,
                        totalPoints: userToReturn.points,
                        address: {
                            state: userToReturn.city,
                            city: userToReturn.delegation,
                            mayoralty: userToReturn.mayoralty,
                            suburb: userToReturn.town
                        },
                        workPosition: userToReturn.position,
                        statusCart: generalConfiguration.isClubBiodermaActive,
                        branchChain: userToReturn.chain,
                        branchOffice: userToReturn.drugstore,
                        postalCode: userToReturn.postalCode,
                        charge: userToReturn.charge,
                        isActiveCart: userToReturn.type.id === 1 ? false : true,
                        countNotifications: userToReturn.notificacion ? userToReturn.notificacion.length : 0,
                        totalBiodermaGames: userToReturn.biodermaGamePoints ? userToReturn.biodermaGamePoints : 0
                    }
                };

            }

            return response;
        } catch (err) {
            console.log("UserService - updateDrugStore: ", err);

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error updating Drugstore user',
            }, 500);
        }
    }

    async deleteUser(requestEmail: string): Promise<any> {
        try {
            let userToDelete = await this.userRepository.findOne({
                where: { email: requestEmail }
            });

            userToDelete.isActive = false;

            await this.userRepository.save(userToDelete);

            return { status: 0 }
        } catch (err) {
            console.log("UserService - deleteUser: ", err);

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error deleting user',
            }, 500);
        }
    }

    async resetUserPoints(): Promise<any> {
        try {
            let usersToReset = await this.userRepository.find({
                where: { isActive: true }
            });

            usersToReset.forEach(tempUser => {
                tempUser.points = 0;
                tempUser.biodermaGamePoints = 0;
            });

            await this.userRepository.save(usersToReset);

            return { status: 0 }
        } catch (err) {
            console.log("UserService - resetUserPoints: ", err);

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error resetting user points',
            }, 500);
        }
    }

    async requestPasswordReset(requestEmail: string): Promise<any> {
        try {

            let response = { status: 0 };

            const user = await this.userRepository.findOne({
                where: { email: requestEmail }
            });

            if (user) {

                let newToken = this.tokenRepository.create({
                    email: requestEmail
                });

                const registerToken = await this.tokenRepository.save(newToken);
                const jwtToken = await jwt.sign({ token: registerToken.id }, "Bi0d3rmaTokenJWT.");
                // Se envia correo
                await this.mailerService.sendMail({
                    to: requestEmail,
                    subject: 'Recuperacion de contraseña.',
                    template: 'recovery',
                    context: {
                        url: jwtToken,
                        email: requestEmail
                    },
                });

            } else {
                response = { status: 1 };
            }

            return response;
        } catch (err) {
            console.log("UserService - requestPasswordReset: ", err);

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error requesting password reset',
            }, 500);
        }
    }

    async getUserPoints(requestEmail: string): Promise<any> {
        try {
            const user = await this.userRepository.findOne({
                where: { email: requestEmail }
            });

            return {
                points: {
                    totalPoints: user.points,
                    biodermaGamePoints: user.biodermaGamePoints
                }
            };
        } catch (err) {
            console.log("UserService - getUserPoints: ", err);

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error getting user points',
            }, 500);
        }
    }

    async passwordRecovery(requestDTO: PasswordRecovery): Promise<any> {
        try {

            let response = { status: 0 };

            const jwtDecoded = await jwt.verify(requestDTO.token, "Bi0d3rmaTokenJWT.");

            if (!jwtDecoded.token) {

                response = { status: 10 };

            } else {

                const tokenExist = await this.tokenRepository.findOne(jwtDecoded.token);

                if (tokenExist) {

                    const passwordHashed = await bcrypt.hash(requestDTO.password, 12);

                    let userToUpdate = await this.userRepository.findOne({
                        where: { email: requestDTO.email }
                    });

                    userToUpdate.password = passwordHashed;
                    // Se actualiza password del usuario
                    await this.userRepository.save(userToUpdate);
                    // Se elimina el token de la base de datos
                    await this.tokenRepository.remove(tokenExist);
                } else {
                    response = { status: 10 };
                }

            }

            return response;
        } catch (err) {
            console.log("UserService - passwordRecovery: ", err);

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error ressetign password',
            }, 500);
        }
    }

}

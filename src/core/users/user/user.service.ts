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
import { InviteUserDTO, CreateUserDTO, CreateNAOSUserDTO, CreateDrugStoreUserDTO, UpdateNAOSUserDTO, UpdateDrugStoreUserDTO } from './user.dto';
import { MailerService } from '@nest-modules/mailer';
import * as jwt from "jsonwebtoken";
import * as bcrypt from 'bcrypt';
import * as moment from 'moment';

@Injectable()
export class UserService {

    constructor(@InjectRepository(User) private userRepository: Repository<User>,
        private readonly mailerService: MailerService,
        @InjectRepository(Token) private tokenRepository: Repository<Token>,
        @InjectRepository(Type) private typeRepository: Repository<Type>,
        @InjectRepository(Chain) private chainRepository: Repository<Chain>,
        @InjectRepository(Position) private positionRepository: Repository<Position>,
        @InjectRepository(City) private stateRepository: Repository<City>,
        @InjectRepository(Delegation) private cityRepository: Repository<Delegation>) { }

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
                    charge: user.charge
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

            let response = null;

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

                let newUser = await this.userRepository.create({
                    name: createNAOSUserDTO.name,
                    lastName: createNAOSUserDTO.lastName,
                    photo: createNAOSUserDTO.photo,
                    birthDate: createNAOSUserDTO.birthDate,
                    gender: createNAOSUserDTO.gender,
                    phone: createNAOSUserDTO.phone,
                    email: createNAOSUserDTO.email,
                    postalCode: createNAOSUserDTO.postalCode,
                    password: userPassword,
                    position: naosPosition,
                    isActive: true,
                    city: userState,
                    delegation: userCity,
                    points: 0,
                    age: userAge,
                    type: userType
                });

                await this.userRepository.save(newUser);

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

                let newUser = await this.userRepository.create({
                    name: createDrugStoreUserDTO.name,
                    lastName: createDrugStoreUserDTO.lastName,
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
                    age: userAge,
                    type: userType,
                    town: createDrugStoreUserDTO.town,
                    charge: createDrugStoreUserDTO.charge,
                    mayoralty: createDrugStoreUserDTO.mayoralty
                });

                await this.userRepository.save(newUser);

                response = { status: 0 }

            }

            return response;
        } catch (err) {
            console.log("UserService - createDrugStore: ", err);

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error creating NAOS user',
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

            const userExist = await this.userRepository.findOne(updateNAOSUserDTO.userId);

            if (!userExist) {

                response = { status: 1 };

            } else {

                const userPassword = await bcrypt.hash(updateNAOSUserDTO.password, 12);
                const userAge = this.getAge(updateNAOSUserDTO.birthDate);

                const naosPosition = await this.positionRepository.findOne(updateNAOSUserDTO.naosPosition);
                const userState = await this.stateRepository.findOne(updateNAOSUserDTO.state);
                const userCity = await this.cityRepository.findOne(updateNAOSUserDTO.city);

                userExist.name = updateNAOSUserDTO.name;
                userExist.lastName = updateNAOSUserDTO.lastName;
                userExist.photo = updateNAOSUserDTO.photo;
                userExist.birthDate = new Date(updateNAOSUserDTO.birthDate);
                userExist.gender = updateNAOSUserDTO.gender;
                userExist.phone = updateNAOSUserDTO.phone;
                userExist.postalCode = updateNAOSUserDTO.postalCode;
                userExist.password = userPassword;
                userExist.position = naosPosition;
                userExist.isActive = true;
                userExist.city = userState;
                userExist.delegation = userCity;
                userExist.age = userAge;

                await this.userRepository.save(userExist);

                response = { status: 0 }

            }

            return response;
        } catch (err) {
            console.log("UserService - updateNAOS: ", err);

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error creating NAOS user',
            }, 500);
        }
    }

    async updateDrugStore(updateDrugStoreUserDTO: UpdateDrugStoreUserDTO): Promise<any> {
        try {

            let response = null;

            const userExist = await this.userRepository.findOne(updateDrugStoreUserDTO.userId);

            if (!userExist) {

                response = { status: 1 };

            } else {

                const userPassword = await bcrypt.hash(updateDrugStoreUserDTO.password, 12);
                const userAge = this.getAge(updateDrugStoreUserDTO.birthDate);

                const userState = await this.stateRepository.findOne(updateDrugStoreUserDTO.state);
                const userCity = await this.cityRepository.findOne(updateDrugStoreUserDTO.city);
                const userChain = await this.chainRepository.findOne(updateDrugStoreUserDTO.chain);


                userExist.name = updateDrugStoreUserDTO.name;
                userExist.lastName = updateDrugStoreUserDTO.lastName;
                userExist.photo = updateDrugStoreUserDTO.photo;
                userExist.birthDate = new Date(updateDrugStoreUserDTO.birthDate);
                userExist.gender = updateDrugStoreUserDTO.gender;
                userExist.phone = updateDrugStoreUserDTO.phone;
                userExist.postalCode = updateDrugStoreUserDTO.postalCode;
                userExist.password = userPassword;
                userExist.chain = userChain;
                userExist.isActive = true;
                userExist.city = userState;
                userExist.delegation = userCity;
                userExist.age = userAge;
                userExist.drugstore = updateDrugStoreUserDTO.drugStore;
                userExist.town = updateDrugStoreUserDTO.town;
                userExist.charge = updateDrugStoreUserDTO.charge;
                userExist.mayoralty = updateDrugStoreUserDTO.mayoralty;


                await this.userRepository.save(userExist);

                response = { status: 0 }

            }

            return response;
        } catch (err) {
            console.log("UserService - updateDrugStore: ", err);

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error creating NAOS user',
            }, 500);
        }
    }

}

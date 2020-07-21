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
import { MailerService } from '@nestjs-modules/mailer';
export declare class UserService {
    private userRepository;
    private readonly mailerService;
    private campaingRepository;
    private quizzRepository;
    private targetRepository;
    private tokenRepository;
    private typeRepository;
    private chainRepository;
    private positionRepository;
    private stateRepository;
    private cityRepository;
    private roleRepository;
    private sesionRepository;
    private configurationRepository;
    constructor(userRepository: Repository<User>, mailerService: MailerService, campaingRepository: Repository<Campaing>, quizzRepository: Repository<Quizz>, targetRepository: Repository<Target>, tokenRepository: Repository<Token>, typeRepository: Repository<Type>, chainRepository: Repository<Chain>, positionRepository: Repository<Position>, stateRepository: Repository<City>, cityRepository: Repository<Delegation>, roleRepository: Repository<Role>, sesionRepository: Repository<Sesion>, configurationRepository: Repository<Configuration>);
    invite(request: InviteUserDTO): Promise<number>;
    findAll(): Promise<any>;
    confirmPassword(requestDTO: ConfirmUserPassword): Promise<any>;
    findUserDetail(requestEmail: string): Promise<any>;
    create(createUserDTO: CreateUserDTO): Promise<any>;
    createNAOS(createNAOSUserDTO: CreateNAOSUserDTO): Promise<any>;
    createDrugStore(createDrugStoreUserDTO: CreateDrugStoreUserDTO): Promise<any>;
    private getAge;
    updateNAOS(updateNAOSUserDTO: UpdateNAOSUserDTO): Promise<any>;
    updateDrugStore(updateDrugStoreUserDTO: UpdateDrugStoreUserDTO): Promise<any>;
    deleteUser(requestEmail: string): Promise<any>;
    resetUserPoints(): Promise<any>;
    requestPasswordReset(requestEmail: string): Promise<any>;
    getUserPoints(requestEmail: string): Promise<any>;
    passwordRecovery(requestDTO: PasswordRecovery): Promise<any>;
    generateReport(userType: string): Promise<any>;
}

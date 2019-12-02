import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Token } from '../token/token.entity';
import { Type } from '../type/type.entity';
import { Chain } from '../chain/chain.entity';
import { City } from '../city/city.entity';
import { Delegation } from '../delegation/delegation.entity';
import { Position } from '../position/position.entity';
import { InviteUserDTO, CreateUserDTO, CreateNAOSUserDTO, CreateDrugStoreUserDTO } from './user.dto';
import { MailerService } from '@nest-modules/mailer';
export declare class UserService {
    private userRepository;
    private readonly mailerService;
    private tokenRepository;
    private typeRepository;
    private chainRepository;
    private positionRepository;
    private stateRepository;
    private cityRepository;
    constructor(userRepository: Repository<User>, mailerService: MailerService, tokenRepository: Repository<Token>, typeRepository: Repository<Type>, chainRepository: Repository<Chain>, positionRepository: Repository<Position>, stateRepository: Repository<City>, cityRepository: Repository<Delegation>);
    invite(request: InviteUserDTO): Promise<number>;
    findAll(): Promise<User[]>;
    create(createUserDTO: CreateUserDTO): Promise<any>;
    createNAOS(createNAOSUserDTO: CreateNAOSUserDTO): Promise<any>;
    createDrugStore(createDrugStoreUserDTO: CreateDrugStoreUserDTO): Promise<any>;
    private getAge;
}

import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Token } from '../token/token.entity';
import { Type } from '../type/type.entity';
import { Chain } from '../chain/chain.entity';
import { InviteUserDTO, CreateUserDTO } from './user.dto';
import { MailerService } from '@nest-modules/mailer';
export declare class UserService {
    private userRepository;
    private readonly mailerService;
    private tokenRepository;
    private typeRepository;
    private chainRepository;
    constructor(userRepository: Repository<User>, mailerService: MailerService, tokenRepository: Repository<Token>, typeRepository: Repository<Type>, chainRepository: Repository<Chain>);
    invite(request: InviteUserDTO): Promise<number>;
    findAll(): Promise<User[]>;
    create(createUserDTO: CreateUserDTO): Promise<any>;
    private getAge;
}

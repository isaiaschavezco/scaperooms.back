import { Repository } from 'typeorm';
import { Sesion } from './sesion.entity';
import { User } from '../user/user.entity';
import { ReuestSesionDTO } from './sesion.dto';
export declare class SesionService {
    private sesionRepository;
    private userRepository;
    constructor(sesionRepository: Repository<Sesion>, userRepository: Repository<User>);
    RequesLogin(requestDTO: ReuestSesionDTO): Promise<any>;
}

import { Repository } from 'typeorm';
import { Sesion } from './sesion.entity';
import { User } from '../user/user.entity';
import { Configuration } from '../configuration/configuration.entity';
import { ReuestSesionDTO, UpdatePlayerID, ReuestSesionLogOutDTO } from './sesion.dto';
import { Notificacion } from '../notification/notificacion.entity';
export declare class SesionService {
    private sesionRepository;
    private userRepository;
    private configurationRepository;
    private notificationRepository;
    constructor(sesionRepository: Repository<Sesion>, userRepository: Repository<User>, configurationRepository: Repository<Configuration>, notificationRepository: Repository<Notificacion>);
    RequesLogin(requestDTO: ReuestSesionDTO): Promise<any>;
    SetPlayerID(updatePlayerID: UpdatePlayerID): Promise<any>;
    RequesLogout(reuestSesionLogOutDTO: ReuestSesionLogOutDTO): Promise<any>;
    RequesLoginAdmin(requestDTO: ReuestSesionDTO): Promise<any>;
}

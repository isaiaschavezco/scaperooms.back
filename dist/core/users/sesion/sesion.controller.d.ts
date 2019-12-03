import { SesionService } from './sesion.service';
import { ReuestSesionDTO, UpdatePlayerID, ReuestSesionLogOutDTO } from './sesion.dto';
export declare class SesionController {
    private sesionService;
    constructor(sesionService: SesionService);
    Login(reuestSesionDTO: ReuestSesionDTO): Promise<any>;
    SetPlayerId(updatePlayerID: UpdatePlayerID): Promise<any>;
    Logout(requestSesionLogOutDTO: ReuestSesionLogOutDTO): Promise<any>;
}

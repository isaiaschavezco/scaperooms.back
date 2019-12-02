import { SesionService } from './sesion.service';
import { ReuestSesionDTO } from './sesion.dto';
export declare class SesionController {
    private sesionService;
    constructor(sesionService: SesionService);
    Login(reuestSesionDTO: ReuestSesionDTO): Promise<any>;
}

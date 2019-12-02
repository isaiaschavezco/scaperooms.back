import { TargetService } from './target.service';
import { Target } from './target.entity';
import { CreateTargetDTO } from './target.dto';
export declare class TargetController {
    private targetService;
    constructor(targetService: TargetService);
    findAllTargets(): Promise<Target[]>;
    create(createDTO: CreateTargetDTO): Promise<number>;
}

import { Repository } from 'typeorm';
import { Tag } from './tag.entity';
import { CreateTagDTO } from './tag.dto';
export declare class TagService {
    private tagRepository;
    constructor(tagRepository: Repository<Tag>);
    findAll(): Promise<any>;
    createTag(createDTO: CreateTagDTO): Promise<any>;
}

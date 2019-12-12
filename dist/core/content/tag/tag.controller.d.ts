import { TagService } from './tag.service';
import { CreateTagDTO } from './tag.dto';
export declare class TagController {
    private tagService;
    constructor(tagService: TagService);
    findAllTags(): Promise<any>;
    createTag(createDTO: CreateTagDTO): Promise<any>;
}

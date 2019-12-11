import { TagService } from './tag.service';
export declare class TagController {
    private tagService;
    constructor(tagService: TagService);
    findAllTags(): Promise<any>;
    createTag(): Promise<any>;
}

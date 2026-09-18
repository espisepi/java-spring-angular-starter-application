import { Tag, TagRequest } from '../models/tag';

export class TagMapper {
    static toRequest(tag: Tag): TagRequest {
        return { name: tag.name };
    }

    static toModel(tag: Tag): Tag {
        return tag;
    }
}

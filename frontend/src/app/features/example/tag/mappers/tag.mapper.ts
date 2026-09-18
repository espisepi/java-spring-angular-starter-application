import { Tag } from '../models/tag';
import { TagDto } from '../models/tag-dto';

export class TagMapper {
  static toDto(tag: Tag): TagDto {
    return { name: tag.name };
  }

  static toModel(tag: Tag): Tag {
    return tag;
  }
}

import { Item } from '../models/Item';
import { ItemDto } from '../models/item-dto';

export class ItemMapper {
  static toDto(item: Item): ItemDto {
    return {
      name: item.name,
      description: item.detail?.description ?? '',
      categoryId: item.category?.id ?? 0,
      tagIds: item.tags?.map(tag => tag.id) ?? [],
      relatedItemIds: item.relatedItems?.map(relatedItem => relatedItem.id) ?? []
    };
  }

  static toModel(item: Item): Item {
    return item;
  }
}

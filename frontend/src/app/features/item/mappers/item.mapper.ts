import { Item, ItemRequest } from '../models/Item';

export class ItemMapper {
    static toRequest(item: Item): ItemRequest {
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

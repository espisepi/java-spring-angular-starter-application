export interface ItemDto {
    name: string;
    description: string;
    categoryId: number;
    tagIds: number[];
    relatedItemIds: number[];
}

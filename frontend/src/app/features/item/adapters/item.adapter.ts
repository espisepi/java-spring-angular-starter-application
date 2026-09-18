import { Observable } from 'rxjs';
import { Item, ItemOption } from '../models/Item';
import { ItemDto } from '../models/item-dto';

export abstract class ItemAdapter {
    abstract getItems(page?: number, size?: number, sort?: string): Observable<Item[]>;
    abstract getItem(id: number): Observable<Item>;
    abstract createItem(request: ItemDto): Observable<Item>;
    abstract updateItem(id: number, request: ItemDto): Observable<Item>;
    abstract deleteItem(id: number): Observable<void>;
    abstract getCategories(): Observable<ItemOption[]>;
    abstract createCategory(name: string): Observable<ItemOption>;
    abstract getTags(): Observable<ItemOption[]>;
    abstract createTag(name: string): Observable<ItemOption>;
}

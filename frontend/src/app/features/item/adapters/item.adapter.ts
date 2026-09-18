import { Observable } from 'rxjs';
import { Item, ItemOption, ItemRequest } from '../models/Item';

export abstract class ItemAdapter {
    abstract getItems(page?: number, size?: number, sort?: string): Observable<Item[]>;
    abstract getItem(id: number): Observable<Item>;
    abstract createItem(request: ItemRequest): Observable<Item>;
    abstract updateItem(id: number, request: ItemRequest): Observable<Item>;
    abstract deleteItem(id: number): Observable<void>;
    abstract getCategories(): Observable<ItemOption[]>;
    abstract createCategory(name: string): Observable<ItemOption>;
    abstract getTags(): Observable<ItemOption[]>;
    abstract createTag(name: string): Observable<ItemOption>;
}

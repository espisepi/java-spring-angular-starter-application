import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Item, ItemOption } from '../models/Item';
import { ItemDto } from '../models/item-dto';
import { ItemConnector } from '../connectors/item.connector';

@Injectable({ providedIn: 'root' })
export class ItemService {
    private readonly connector = inject(ItemConnector);

    getItems(): Observable<Item[]> { return this.connector.getItems(); }
    createItem(request: ItemDto): Observable<Item> { return this.connector.createItem(request); }
    updateItem(id: number, request: ItemDto): Observable<Item> { return this.connector.updateItem(id, request); }
    deleteItem(id: number): Observable<void> { return this.connector.deleteItem(id); }
    getCategories(): Observable<ItemOption[]> { return this.connector.getCategories(); }
    createCategory(name: string): Observable<ItemOption> { return this.connector.createCategory(name); }
    getTags(): Observable<ItemOption[]> { return this.connector.getTags(); }
    createTag(name: string): Observable<ItemOption> { return this.connector.createTag(name); }
}

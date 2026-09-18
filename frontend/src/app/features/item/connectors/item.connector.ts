import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Item, ItemOption, ItemRequest } from '../models/Item';
import { ItemAdapter } from '../adapters/item.adapter';

@Injectable({ providedIn: 'root' })
export class ItemConnector {
    private readonly adapter = inject(ItemAdapter);

    getItems(page?: number, size?: number, sort?: string): Observable<Item[]> {
        return this.adapter.getItems(page, size, sort);
    }

    getItem(id: number): Observable<Item> {
        return this.adapter.getItem(id);
    }

    createItem(request: ItemRequest): Observable<Item> {
        return this.adapter.createItem(request);
    }

    updateItem(id: number, request: ItemRequest): Observable<Item> {
        return this.adapter.updateItem(id, request);
    }

    deleteItem(id: number): Observable<void> {
        return this.adapter.deleteItem(id);
    }

    getCategories(): Observable<ItemOption[]> {
        return this.adapter.getCategories();
    }

    createCategory(name: string): Observable<ItemOption> {
        return this.adapter.createCategory(name);
    }

    getTags(): Observable<ItemOption[]> {
        return this.adapter.getTags();
    }

    createTag(name: string): Observable<ItemOption> {
        return this.adapter.createTag(name);
    }
}

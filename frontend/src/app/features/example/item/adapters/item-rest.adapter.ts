import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Item, ItemOption } from '../models/Item';
import { ItemDto } from '../models/item-dto';
import { ItemAdapter } from './item.adapter';

@Injectable()
export class ItemRestAdapter extends ItemAdapter {
    private readonly http = inject(HttpClient);
    private readonly itemsEndpoint = `${environment.apiUrl}/items`;

    getItems(page = 0, size = 10, sort = 'id,desc'): Observable<Item[]> {
        if (page === 0 && size === 10 && sort === 'id,desc') {
            return this.http.get<Item[]>(this.itemsEndpoint);
        }

        return this.http.get<Item[]>(this.itemsEndpoint, { params: { page, size, sort } });
    }

    getItem(id: number): Observable<Item> {
        return this.http.get<Item>(`${this.itemsEndpoint}/${id}`);
    }

    createItem(request: ItemDto): Observable<Item> {
        return this.http.post<Item>(this.itemsEndpoint, request);
    }

    updateItem(id: number, request: ItemDto): Observable<Item> {
        return this.http.put<Item>(`${this.itemsEndpoint}/${id}`, request);
    }

    deleteItem(id: number): Observable<void> {
        return this.http.delete<void>(`${this.itemsEndpoint}/${id}`);
    }

    getCategories(): Observable<ItemOption[]> {
        return this.http.get<ItemOption[]>(`${environment.apiUrl}/item-categories`);
    }

    createCategory(name: string): Observable<ItemOption> {
        return this.http.post<ItemOption>(`${environment.apiUrl}/item-categories`, { name });
    }

    getTags(): Observable<ItemOption[]> {
        return this.http.get<ItemOption[]>(`${environment.apiUrl}/item-tags`);
    }

    createTag(name: string): Observable<ItemOption> {
        return this.http.post<ItemOption>(`${environment.apiUrl}/item-tags`, { name });
    }
}

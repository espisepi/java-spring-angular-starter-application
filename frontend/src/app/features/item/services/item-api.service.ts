import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Item } from '../models/Item';

@Injectable({ providedIn: 'root' })
export class ItemApiService {
  private readonly http = inject(HttpClient);
  private readonly itemsEndpoint = `${environment.apiUrl}/items`;

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.itemsEndpoint);
  }
}

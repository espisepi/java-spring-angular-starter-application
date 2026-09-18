import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Category, CategoryRequest } from '../models/category';
import { CategoryAdapter } from './category.adapter';

@Injectable()
export class CategoryRestAdapter extends CategoryAdapter {
  private readonly http = inject(HttpClient);
  private readonly endpoint = `${environment.apiUrl}/item-categories`;

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(this.endpoint);
  }

  create(request: CategoryRequest): Observable<Category> {
    return this.http.post<Category>(this.endpoint, request);
  }

  update(id: number, request: CategoryRequest): Observable<Category> {
    return this.http.put<Category>(`${this.endpoint}/${id}`, request);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.endpoint}/${id}`);
  }
}

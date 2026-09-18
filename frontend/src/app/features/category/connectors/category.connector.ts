import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Category, CategoryRequest } from '../models/category';
import { CategoryAdapter } from '../adapters/category.adapter';

@Injectable({ providedIn: 'root' })
export class CategoryConnector {
  private readonly adapter = inject(CategoryAdapter);

  getAll(): Observable<Category[]> { return this.adapter.getAll(); }
  create(request: CategoryRequest): Observable<Category> { return this.adapter.create(request); }
  update(id: number, request: CategoryRequest): Observable<Category> { return this.adapter.update(id, request); }
  delete(id: number): Observable<void> { return this.adapter.delete(id); }
}

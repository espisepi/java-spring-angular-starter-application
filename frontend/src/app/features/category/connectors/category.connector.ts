import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category';
import { CategoryDto } from '../models/category-dto';
import { CategoryAdapter } from '../adapters/category.adapter';

@Injectable({ providedIn: 'root' })
export class CategoryConnector {
  private readonly adapter = inject(CategoryAdapter);

  getAll(): Observable<Category[]> { return this.adapter.getAll(); }
  create(request: CategoryDto): Observable<Category> { return this.adapter.create(request); }
  update(id: number, request: CategoryDto): Observable<Category> { return this.adapter.update(id, request); }
  delete(id: number): Observable<void> { return this.adapter.delete(id); }
}

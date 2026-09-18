import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category';
import { CategoryDto } from '../models/category-dto';
import { CategoryConnector } from '../connectors/category.connector';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private readonly connector = inject(CategoryConnector);
  getAll(): Observable<Category[]> { return this.connector.getAll(); }
  create(request: CategoryDto): Observable<Category> { return this.connector.create(request); }
  update(id: number, request: CategoryDto): Observable<Category> { return this.connector.update(id, request); }
  delete(id: number): Observable<void> { return this.connector.delete(id); }
}

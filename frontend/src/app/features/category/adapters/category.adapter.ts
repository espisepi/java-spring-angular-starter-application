import { Observable } from 'rxjs';
import { Category, CategoryRequest } from '../models/category';

export abstract class CategoryAdapter {
  abstract getAll(): Observable<Category[]>;
  abstract create(request: CategoryRequest): Observable<Category>;
  abstract update(id: number, request: CategoryRequest): Observable<Category>;
  abstract delete(id: number): Observable<void>;
}

import { Observable } from 'rxjs';
import { Category } from '../models/category';
import { CategoryDto } from '../models/category-dto';

export abstract class CategoryAdapter {
  abstract getAll(): Observable<Category[]>;
  abstract create(request: CategoryDto): Observable<Category>;
  abstract update(id: number, request: CategoryDto): Observable<Category>;
  abstract delete(id: number): Observable<void>;
}

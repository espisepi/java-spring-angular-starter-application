import { Observable } from 'rxjs';
import { Category, CategoryRequest } from '../models/category';

export abstract class CategoryFacade {
  abstract readonly categories$: Observable<Category[]>;
  abstract readonly isLoading$: Observable<boolean>;
  abstract readonly isMutating$: Observable<boolean>;
  abstract readonly error$: Observable<string | null>;
  abstract load(): void;
  abstract create(request: CategoryRequest): Observable<Category>;
  abstract update(id: number, request: CategoryRequest): Observable<Category>;
  abstract delete(id: number): Observable<void>;
}

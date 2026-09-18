import { Injectable, inject } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { filter, map, Observable, take } from 'rxjs';
import { Category } from '../models/category';
import { CategoryDto } from '../models/category-dto';
import { CategoryMapper } from '../mappers/category.mapper';
import * as CategoryActions from '../store/category.actions';
import * as CategorySelectors from '../store/category.selectors';

@Injectable({ providedIn: 'root' })
export class CategoryFacade {
  private readonly store = inject(Store);
  private readonly actions$ = inject(Actions);
  readonly categories$ = this.store.select(CategorySelectors.selectAll);
  readonly isLoading$ = this.store.select(CategorySelectors.selectIsLoading);
  readonly isMutating$ = this.store.select(CategorySelectors.selectIsMutating);
  readonly error$ = this.store.select(CategorySelectors.selectError);
  load(): void { this.store.dispatch(CategoryActions.load()); }
  create(request: CategoryDto): Observable<Category> { return this.dispatch(CategoryActions.create({ requestId: this.id(), request: this.toDto(request) }), CategoryActions.createSuccess, CategoryActions.createFailure, 'category'); }
  update(id: number, request: CategoryDto): Observable<Category> { return this.dispatch(CategoryActions.update({ requestId: this.id(), id, request: this.toDto(request) }), CategoryActions.updateSuccess, CategoryActions.updateFailure, 'category'); }
  delete(id: number): Observable<void> { return this.dispatch(CategoryActions.remove({ requestId: this.id(), id }), CategoryActions.removeSuccess, CategoryActions.removeFailure); }
  toDto(category: Category | CategoryDto): CategoryDto { return 'id' in category ? CategoryMapper.toDto(category) : category; }
  private dispatch<T>(action: any, success: any, failure: any, property?: string): Observable<T> { const requestId = action.requestId; const result$ = this.actions$.pipe(ofType(success, failure), filter((result: any) => result.requestId === requestId), take(1), map((result: any) => { if (result.error) throw new Error(result.error); return property ? CategoryMapper.toModel(result[property]) as T : undefined as unknown as T; })) as unknown as Observable<T>; this.store.dispatch(action); return result$; }
  private id(): string { return `${Date.now()}-${Math.random().toString(36).slice(2)}`; }
}

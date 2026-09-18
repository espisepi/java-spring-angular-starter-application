import { Injectable, inject } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { filter, map, Observable, take } from 'rxjs';
import { Category, CategoryRequest } from '../models/category';
import * as ActionsApi from '../store/category.actions';
import * as Selectors from '../store/category.selectors';
import { CategoryFacade } from '../facade/category.facade';

@Injectable({ providedIn: 'root' })
export class CategoryService extends CategoryFacade {
  private readonly store = inject(Store);
  private readonly actions$ = inject(Actions);
  readonly categories$ = this.store.select(Selectors.selectAll);
  readonly isLoading$ = this.store.select(Selectors.selectIsLoading);
  readonly isMutating$ = this.store.select(Selectors.selectIsMutating);
  readonly error$ = this.store.select(Selectors.selectError);
  load(): void { this.store.dispatch(ActionsApi.load()); }
  create(request: CategoryRequest): Observable<Category> { const requestId = this.id(); const result$ = this.wait<Category>(requestId, ActionsApi.createSuccess, ActionsApi.createFailure, 'category') as unknown as Observable<Category>; this.store.dispatch(ActionsApi.create({ requestId, request })); return result$; }
  update(id: number, request: CategoryRequest): Observable<Category> { const requestId = this.id(); const result$ = this.wait<Category>(requestId, ActionsApi.updateSuccess, ActionsApi.updateFailure, 'category') as unknown as Observable<Category>; this.store.dispatch(ActionsApi.update({ requestId, id, request })); return result$; }
  delete(id: number): Observable<void> { const requestId = this.id(); const result$ = this.wait<void>(requestId, ActionsApi.removeSuccess, ActionsApi.removeFailure) as unknown as Observable<void>; this.store.dispatch(ActionsApi.remove({ requestId, id })); return result$; }
  private wait<T>(requestId: string, success: any, failure: any, property?: string): Observable<T> { return this.actions$.pipe(ofType(success, failure), filter((action: any) => action.requestId === requestId), take(1), map((action: any) => { if (action.error) throw new Error(action.error); return property ? action[property] as T : undefined as unknown as T; })) as unknown as Observable<T>; }
  private id(): string { return `${Date.now()}-${Math.random().toString(36).slice(2)}`; }
}

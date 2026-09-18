import { Injectable, inject } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { filter, map, Observable, take } from 'rxjs';
import { Tag, TagRequest } from '../models/tag';
import * as TagActions from '../store/tag.actions';
import * as Selectors from '../store/tag.selectors';
import { TagFacade } from '../facade/tag.facade';

@Injectable({ providedIn: 'root' })
export class TagService extends TagFacade {
  private readonly store = inject(Store);
  private readonly actions$ = inject(Actions);
  readonly tags$ = this.store.select(Selectors.selectAll);
  readonly isLoading$ = this.store.select(Selectors.selectIsLoading);
  readonly isMutating$ = this.store.select(Selectors.selectIsMutating);
  readonly error$ = this.store.select(Selectors.selectError);
  load(): void { this.store.dispatch(TagActions.load()); }
  create(request: TagRequest): Observable<Tag> { const requestId = this.id(); const result$ = this.wait<Tag>(requestId, TagActions.createSuccess, TagActions.createFailure, 'tag'); this.store.dispatch(TagActions.create({ requestId, request })); return result$; }
  update(id: number, request: TagRequest): Observable<Tag> { const requestId = this.id(); const result$ = this.wait<Tag>(requestId, TagActions.updateSuccess, TagActions.updateFailure, 'tag'); this.store.dispatch(TagActions.update({ requestId, id, request })); return result$; }
  delete(id: number): Observable<void> { const requestId = this.id(); const result$ = this.wait<void>(requestId, TagActions.removeSuccess, TagActions.removeFailure); this.store.dispatch(TagActions.remove({ requestId, id })); return result$; }
  private wait<T>(requestId: string, success: any, failure: any, property?: string): Observable<T> { return this.actions$.pipe(ofType(success, failure), filter((action: any) => action.requestId === requestId), take(1), map((action: any) => { if (action.error) throw new Error(action.error); return property ? action[property] as T : undefined as unknown as T; })) as Observable<T>; }
  private id(): string { return `${Date.now()}-${Math.random().toString(36).slice(2)}`; }
}

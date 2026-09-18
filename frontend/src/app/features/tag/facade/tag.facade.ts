import { Injectable, inject } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { filter, map, Observable, take } from 'rxjs';
import { Tag, TagRequest } from '../models/tag';
import { TagMapper } from '../mappers/tag.mapper';
import * as TagActions from '../store/tag.actions';
import * as TagSelectors from '../store/tag.selectors';

@Injectable({ providedIn: 'root' })
export class TagFacade {
    private readonly store = inject(Store);
    private readonly actions$ = inject(Actions);
    readonly tags$ = this.store.select(TagSelectors.selectAll);
    readonly isLoading$ = this.store.select(TagSelectors.selectIsLoading);
    readonly isMutating$ = this.store.select(TagSelectors.selectIsMutating);
    readonly error$ = this.store.select(TagSelectors.selectError);
    load(): void { this.store.dispatch(TagActions.load()); }
    create(request: TagRequest): Observable<Tag> { return this.dispatch(TagActions.create({ requestId: this.id(), request: this.toRequest(request) }), TagActions.createSuccess, TagActions.createFailure, 'tag'); }
    update(id: number, request: TagRequest): Observable<Tag> { return this.dispatch(TagActions.update({ requestId: this.id(), id, request: this.toRequest(request) }), TagActions.updateSuccess, TagActions.updateFailure, 'tag'); }
    delete(id: number): Observable<void> { return this.dispatch(TagActions.remove({ requestId: this.id(), id }), TagActions.removeSuccess, TagActions.removeFailure); }
    toRequest(tag: Tag | TagRequest): TagRequest { return 'id' in tag ? TagMapper.toRequest(tag) : tag; }
    private dispatch<T>(action: any, success: any, failure: any, property?: string): Observable<T> { const requestId = action.requestId; const result$ = this.actions$.pipe(ofType(success, failure), filter((result: any) => result.requestId === requestId), take(1), map((result: any) => { if (result.error) throw new Error(result.error); return property ? TagMapper.toModel(result[property]) as T : undefined as unknown as T; })) as unknown as Observable<T>; this.store.dispatch(action); return result$; }
    private id(): string { return `${Date.now()}-${Math.random().toString(36).slice(2)}`; }
}

import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, of, switchMap } from 'rxjs';
import { TagService } from '../services/tag.service';
import * as TagActions from './tag.actions';

@Injectable()
export class TagEffects {
  private readonly actions$ = inject(Actions);
  private readonly service = inject(TagService);
  readonly load$ = createEffect(() => this.actions$.pipe(ofType(TagActions.load), switchMap(() => this.service.getAll().pipe(map(tags => TagActions.loadSuccess({ tags })), catchError(error => of(TagActions.loadFailure({ error: this.error(error) })))))));
  readonly create$ = createEffect(() => this.actions$.pipe(ofType(TagActions.create), concatMap(({ requestId, request }) => this.service.create(request).pipe(switchMap(tag => [TagActions.createSuccess({ requestId, tag }), TagActions.load()]), catchError(error => of(TagActions.createFailure({ requestId, error: this.error(error) })))))));
  readonly update$ = createEffect(() => this.actions$.pipe(ofType(TagActions.update), concatMap(({ requestId, id, request }) => this.service.update(id, request).pipe(switchMap(tag => [TagActions.updateSuccess({ requestId, tag }), TagActions.load()]), catchError(error => of(TagActions.updateFailure({ requestId, error: this.error(error) })))))));
  readonly remove$ = createEffect(() => this.actions$.pipe(ofType(TagActions.remove), concatMap(({ requestId, id }) => this.service.delete(id).pipe(switchMap(() => [TagActions.removeSuccess({ requestId }), TagActions.load()]), catchError(error => of(TagActions.removeFailure({ requestId, error: this.error(error) })))))));
  private error(error: unknown): string { return error instanceof Error ? error.message : 'No se pudo completar la operación.'; }
}

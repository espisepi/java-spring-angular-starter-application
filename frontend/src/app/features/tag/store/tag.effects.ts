import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, of, switchMap } from 'rxjs';
import { TagConnector } from '../connectors/tag.connector';
import * as TagActions from './tag.actions';

@Injectable()
export class TagEffects {
  private readonly actions$ = inject(Actions);
  private readonly connector = inject(TagConnector);
  readonly load$ = createEffect(() => this.actions$.pipe(ofType(TagActions.load), switchMap(() => this.connector.getAll().pipe(map(tags => TagActions.loadSuccess({ tags })), catchError(error => of(TagActions.loadFailure({ error: this.error(error) })))))));
  readonly create$ = createEffect(() => this.actions$.pipe(ofType(TagActions.create), concatMap(({ requestId, request }) => this.connector.create(request).pipe(switchMap(tag => [TagActions.createSuccess({ requestId, tag }), TagActions.load()]), catchError(error => of(TagActions.createFailure({ requestId, error: this.error(error) })))))));
  readonly update$ = createEffect(() => this.actions$.pipe(ofType(TagActions.update), concatMap(({ requestId, id, request }) => this.connector.update(id, request).pipe(switchMap(tag => [TagActions.updateSuccess({ requestId, tag }), TagActions.load()]), catchError(error => of(TagActions.updateFailure({ requestId, error: this.error(error) })))))));
  readonly remove$ = createEffect(() => this.actions$.pipe(ofType(TagActions.remove), concatMap(({ requestId, id }) => this.connector.delete(id).pipe(switchMap(() => [TagActions.removeSuccess({ requestId }), TagActions.load()]), catchError(error => of(TagActions.removeFailure({ requestId, error: this.error(error) })))))));
  private error(error: unknown): string { return error instanceof Error ? error.message : 'No se pudo completar la operación.'; }
}

import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, of, switchMap } from 'rxjs';
import { CategoryConnector } from '../connectors/category.connector';
import * as CategoryActions from './category.actions';

@Injectable()
export class CategoryEffects {
    private readonly actions$ = inject(Actions);
    private readonly connector = inject(CategoryConnector);
    readonly load$ = createEffect(() => this.actions$.pipe(ofType(CategoryActions.load), switchMap(() => this.connector.getAll().pipe(map(categories => CategoryActions.loadSuccess({ categories })), catchError(error => of(CategoryActions.loadFailure({ error: this.error(error) })))))));
    readonly create$ = createEffect(() => this.actions$.pipe(ofType(CategoryActions.create), concatMap(({ requestId, request }) => this.connector.create(request).pipe(switchMap(category => [CategoryActions.createSuccess({ requestId, category }), CategoryActions.load()]), catchError(error => of(CategoryActions.createFailure({ requestId, error: this.error(error) })))))));
    readonly update$ = createEffect(() => this.actions$.pipe(ofType(CategoryActions.update), concatMap(({ requestId, id, request }) => this.connector.update(id, request).pipe(switchMap(category => [CategoryActions.updateSuccess({ requestId, category }), CategoryActions.load()]), catchError(error => of(CategoryActions.updateFailure({ requestId, error: this.error(error) })))))));
    readonly remove$ = createEffect(() => this.actions$.pipe(ofType(CategoryActions.remove), concatMap(({ requestId, id }) => this.connector.delete(id).pipe(switchMap(() => [CategoryActions.removeSuccess({ requestId }), CategoryActions.load()]), catchError(error => of(CategoryActions.removeFailure({ requestId, error: this.error(error) })))))));
    private error(error: unknown): string { return error instanceof Error ? error.message : 'No se pudo completar la operación.'; }
}

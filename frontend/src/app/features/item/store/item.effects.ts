import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, exhaustMap, forkJoin, map, of, switchMap } from 'rxjs';
import { ItemConnector } from '../connectors/item.connector';
import * as ItemActions from './item.actions';

@Injectable()
export class ItemEffects {
  private readonly actions$ = inject(Actions);
  private readonly connector = inject(ItemConnector);

  readonly loadItems$ = createEffect(() => this.actions$.pipe(
    ofType(ItemActions.loadItems),
    exhaustMap(() => this.connector.getItems().pipe(
      map(items => ItemActions.loadItemsSuccess({ items })),
      catchError(error => of(ItemActions.loadItemsFailure({ error: this.getErrorMessage(error) })))
    ))
  ));

  readonly loadOptions$ = createEffect(() => this.actions$.pipe(
    ofType(ItemActions.loadItemOptions),
    switchMap(() => forkJoin({
      categories: this.connector.getCategories(),
      tags: this.connector.getTags()
    }).pipe(
      switchMap(({ categories, tags }) => [
        ItemActions.loadCategoriesSuccess({ categories }),
        ItemActions.loadTagsSuccess({ tags })
      ]),
      catchError(error => of(ItemActions.loadCategoriesFailure({ error: this.getErrorMessage(error) })))
    ))
  ));

  readonly createItem$ = createEffect(() => this.actions$.pipe(
    ofType(ItemActions.createItem),
    concatMap(({ requestId, request }) => this.connector.createItem(request).pipe(
      switchMap(item => [
        ItemActions.createItemSuccess({ requestId, item }),
        ItemActions.loadItems()
      ]),
      catchError(error => of(ItemActions.createItemFailure({ requestId, error: this.getErrorMessage(error) })))
    ))
  ));

  readonly updateItem$ = createEffect(() => this.actions$.pipe(
    ofType(ItemActions.updateItem),
    concatMap(({ requestId, id, request }) => this.connector.updateItem(id, request).pipe(
      switchMap(item => [
        ItemActions.updateItemSuccess({ requestId, item }),
        ItemActions.loadItems()
      ]),
      catchError(error => of(ItemActions.updateItemFailure({ requestId, error: this.getErrorMessage(error) })))
    ))
  ));

  readonly deleteItem$ = createEffect(() => this.actions$.pipe(
    ofType(ItemActions.deleteItem),
    concatMap(({ requestId, id }) => this.connector.deleteItem(id).pipe(
      switchMap(() => [
        ItemActions.deleteItemSuccess({ requestId }),
        ItemActions.loadItems()
      ]),
      catchError(error => of(ItemActions.deleteItemFailure({ requestId, error: this.getErrorMessage(error) })))
    ))
  ));

  readonly createCategory$ = createEffect(() => this.actions$.pipe(
    ofType(ItemActions.createCategory),
    concatMap(({ requestId, name }) => this.connector.createCategory(name).pipe(
      switchMap(category => [
        ItemActions.createCategorySuccess({ requestId, category }),
        ItemActions.loadItemOptions()
      ]),
      catchError(error => of(ItemActions.createCategoryFailure({ requestId, error: this.getErrorMessage(error) })))
    ))
  ));

  readonly createTag$ = createEffect(() => this.actions$.pipe(
    ofType(ItemActions.createTag),
    concatMap(({ requestId, name }) => this.connector.createTag(name).pipe(
      switchMap(tag => [
        ItemActions.createTagSuccess({ requestId, tag }),
        ItemActions.loadItemOptions()
      ]),
      catchError(error => of(ItemActions.createTagFailure({ requestId, error: this.getErrorMessage(error) })))
    ))
  ));

  private getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }

    if (typeof error === 'object' && error !== null && 'message' in error) {
      return String(error.message);
    }

    return 'Unable to load items.';
  }
}

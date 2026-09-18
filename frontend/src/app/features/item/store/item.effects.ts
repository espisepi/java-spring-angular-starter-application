import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, exhaustMap, forkJoin, map, of, switchMap } from 'rxjs';
import { ItemService } from '../services/item.service';
import * as ItemActions from './item.actions';

@Injectable()
export class ItemEffects {
  private readonly actions$ = inject(Actions);
  private readonly itemService = inject(ItemService);

  readonly loadItems$ = createEffect(() => this.actions$.pipe(
    ofType(ItemActions.loadItems),
    exhaustMap(() => this.itemService.getItems().pipe(
      map(items => ItemActions.loadItemsSuccess({ items })),
      catchError(error => of(ItemActions.loadItemsFailure({ error: this.getErrorMessage(error) })))
    ))
  ));

  readonly loadOptions$ = createEffect(() => this.actions$.pipe(
    ofType(ItemActions.loadItemOptions),
    switchMap(() => forkJoin({
      categories: this.itemService.getCategories(),
      tags: this.itemService.getTags()
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
    concatMap(({ requestId, request }) => this.itemService.createItem(request).pipe(
      switchMap(item => [
        ItemActions.createItemSuccess({ requestId, item }),
        ItemActions.loadItems()
      ]),
      catchError(error => of(ItemActions.createItemFailure({ requestId, error: this.getErrorMessage(error) })))
    ))
  ));

  readonly updateItem$ = createEffect(() => this.actions$.pipe(
    ofType(ItemActions.updateItem),
    concatMap(({ requestId, id, request }) => this.itemService.updateItem(id, request).pipe(
      switchMap(item => [
        ItemActions.updateItemSuccess({ requestId, item }),
        ItemActions.loadItems()
      ]),
      catchError(error => of(ItemActions.updateItemFailure({ requestId, error: this.getErrorMessage(error) })))
    ))
  ));

  readonly deleteItem$ = createEffect(() => this.actions$.pipe(
    ofType(ItemActions.deleteItem),
    concatMap(({ requestId, id }) => this.itemService.deleteItem(id).pipe(
      switchMap(() => [
        ItemActions.deleteItemSuccess({ requestId }),
        ItemActions.loadItems()
      ]),
      catchError(error => of(ItemActions.deleteItemFailure({ requestId, error: this.getErrorMessage(error) })))
    ))
  ));

  readonly createCategory$ = createEffect(() => this.actions$.pipe(
    ofType(ItemActions.createCategory),
    concatMap(({ requestId, name }) => this.itemService.createCategory(name).pipe(
      switchMap(category => [
        ItemActions.createCategorySuccess({ requestId, category }),
        ItemActions.loadItemOptions()
      ]),
      catchError(error => of(ItemActions.createCategoryFailure({ requestId, error: this.getErrorMessage(error) })))
    ))
  ));

  readonly createTag$ = createEffect(() => this.actions$.pipe(
    ofType(ItemActions.createTag),
    concatMap(({ requestId, name }) => this.itemService.createTag(name).pipe(
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

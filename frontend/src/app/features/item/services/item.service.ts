import { Injectable, inject } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { filter, map, Observable, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { Item, ItemOption, ItemRequest } from '../models/Item';
import { ItemFacade } from '../facade/item.facade';
import * as ItemActions from '../store/item.actions';
import * as ItemSelectors from '../store/item.selectors';

@Injectable({ providedIn: 'root' })
export class ItemService extends ItemFacade {
  private readonly store = inject(Store);
  private readonly actions$ = inject(Actions);

  override readonly items$ = this.store.select(ItemSelectors.selectItems);
  override readonly isLoading$ = this.store.select(ItemSelectors.selectIsLoading);
  override readonly errorMessage$ = this.store.select(ItemSelectors.selectErrorMessage);
  override readonly categories$ = this.store.select(ItemSelectors.selectCategories);
  override readonly tags$ = this.store.select(ItemSelectors.selectTags);
  override readonly isMutating$ = this.store.select(ItemSelectors.selectIsMutating);
  override readonly mutationError$ = this.store.select(ItemSelectors.selectMutationError);

  override loadItems(): void {
    this.store.dispatch(ItemActions.loadItems());
  }

  override refreshItems(): void {
    this.store.dispatch(ItemActions.loadItems());
  }

  override loadOptions(): void {
    this.store.dispatch(ItemActions.loadItemOptions());
  }

  override createCategory(name: string): Observable<ItemOption> {
    const requestId = this.createRequestId();
    const result$ = this.actions$.pipe(
      ofType(ItemActions.createCategorySuccess, ItemActions.createCategoryFailure),
      filter(action => action.requestId === requestId),
      take(1),
      map(action => 'category' in action ? action.category : this.throwActionError(action.error))
    );
    this.store.dispatch(ItemActions.createCategory({ requestId, name }));
    return result$;
  }

  override createTag(name: string): Observable<ItemOption> {
    const requestId = this.createRequestId();
    const result$ = this.actions$.pipe(
      ofType(ItemActions.createTagSuccess, ItemActions.createTagFailure),
      filter(action => action.requestId === requestId),
      take(1),
      map(action => 'tag' in action ? action.tag : this.throwActionError(action.error))
    );
    this.store.dispatch(ItemActions.createTag({ requestId, name }));
    return result$;
  }

  override createItem(request: ItemRequest): Observable<Item> {
    const requestId = this.createRequestId();
    const result$ = this.actions$.pipe(
      ofType(ItemActions.createItemSuccess, ItemActions.createItemFailure),
      filter(action => action.requestId === requestId),
      take(1),
      map(action => 'item' in action ? action.item : this.throwActionError(action.error))
    );
    this.store.dispatch(ItemActions.createItem({ requestId, request }));
    return result$;
  }

  override updateItem(id: number, request: ItemRequest): Observable<Item> {
    const requestId = this.createRequestId();
    const result$ = this.actions$.pipe(
      ofType(ItemActions.updateItemSuccess, ItemActions.updateItemFailure),
      filter(action => action.requestId === requestId),
      take(1),
      map(action => 'item' in action ? action.item : this.throwActionError(action.error))
    );
    this.store.dispatch(ItemActions.updateItem({ requestId, id, request }));
    return result$;
  }

  override deleteItem(id: number): Observable<void> {
    const requestId = this.createRequestId();
    const result$ = this.actions$.pipe(
      ofType(ItemActions.deleteItemSuccess, ItemActions.deleteItemFailure),
      filter(action => action.requestId === requestId),
      take(1),
      map(action => 'error' in action ? this.throwActionError(action.error) : undefined)
    );
    this.store.dispatch(ItemActions.deleteItem({ requestId, id }));
    return result$;
  }

  override invalidateCache(): void {
    this.store.dispatch(ItemActions.clearItemState());
  }

  private createRequestId(): string {
    return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }

  private throwActionError(error: string): never {
    throw new Error(error);
  }
}

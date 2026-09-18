import { Injectable, inject } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { filter, map, Observable, take } from 'rxjs';
import { Item, ItemOption } from '../models/Item';
import { ItemDto } from '../models/item-dto';
import { ItemMapper } from '../mappers/item.mapper';
import * as ItemActions from '../store/item.actions';
import * as ItemSelectors from '../store/item.selectors';

@Injectable({ providedIn: 'root' })
export class ItemFacade {
  private readonly store = inject(Store);
  private readonly actions$ = inject(Actions);

  readonly items$ = this.store.select(ItemSelectors.selectItems);
  readonly isLoading$ = this.store.select(ItemSelectors.selectIsLoading);
  readonly errorMessage$ = this.store.select(ItemSelectors.selectErrorMessage);
  readonly categories$ = this.store.select(ItemSelectors.selectCategories);
  readonly tags$ = this.store.select(ItemSelectors.selectTags);
  readonly isMutating$ = this.store.select(ItemSelectors.selectIsMutating);
  readonly mutationError$ = this.store.select(ItemSelectors.selectMutationError);

  loadItems(): void {
    this.store.dispatch(ItemActions.loadItems());
  }

  refreshItems(): void {
    this.store.dispatch(ItemActions.loadItems());
  }

  loadOptions(): void {
    this.store.dispatch(ItemActions.loadItemOptions());
  }

  createCategory(name: string): Observable<ItemOption> {
    const requestId = this.createRequestId();
    const result$ = this.waitFor<ItemOption>(ItemActions.createCategorySuccess, ItemActions.createCategoryFailure, requestId, 'category');
    this.store.dispatch(ItemActions.createCategory({ requestId, name }));
    return result$;
  }

  createTag(name: string): Observable<ItemOption> {
    const requestId = this.createRequestId();
    const result$ = this.waitFor<ItemOption>(ItemActions.createTagSuccess, ItemActions.createTagFailure, requestId, 'tag');
    this.store.dispatch(ItemActions.createTag({ requestId, name }));
    return result$;
  }

  createItem(request: ItemDto): Observable<Item> {
    const requestId = this.createRequestId();
    const result$ = this.waitFor<Item>(ItemActions.createItemSuccess, ItemActions.createItemFailure, requestId, 'item')
      .pipe(map(item => ItemMapper.toModel(item)));
    this.store.dispatch(ItemActions.createItem({ requestId, request: this.toDto(request) }));
    return result$;
  }

  updateItem(id: number, request: ItemDto): Observable<Item> {
    const requestId = this.createRequestId();
    const result$ = this.waitFor<Item>(ItemActions.updateItemSuccess, ItemActions.updateItemFailure, requestId, 'item')
      .pipe(map(item => ItemMapper.toModel(item)));
    this.store.dispatch(ItemActions.updateItem({ requestId, id, request: this.toDto(request) }));
    return result$;
  }

  deleteItem(id: number): Observable<void> {
    const requestId = this.createRequestId();
    const result$ = this.waitFor<void>(ItemActions.deleteItemSuccess, ItemActions.deleteItemFailure, requestId);
    this.store.dispatch(ItemActions.deleteItem({ requestId, id }));
    return result$;
  }

  invalidateCache(): void {
    this.store.dispatch(ItemActions.clearItemState());
  }

  toDto(item: Item | ItemDto): ItemDto {
    return 'id' in item ? ItemMapper.toDto(item) : item;
  }

  private waitFor<T>(success: any, failure: any, requestId: string, property?: string): Observable<T> {
    return this.actions$.pipe(
      ofType(success, failure),
      filter((action: any) => action.requestId === requestId),
      take(1),
      map((action: any) => {
        if (action.error) {
          throw new Error(action.error);
        }
        return property ? action[property] as T : undefined as unknown as T;
      })
    ) as unknown as Observable<T>;
  }

  private createRequestId(): string {
    return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }
}

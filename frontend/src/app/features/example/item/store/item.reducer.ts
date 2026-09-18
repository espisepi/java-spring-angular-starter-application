import { createReducer, on } from '@ngrx/store';
import { Item, ItemOption } from '../models/Item';
import * as ItemActions from './item.actions';

export const itemFeatureKey = 'item';

export interface ItemState {
  items: Item[];
  categories: ItemOption[];
  tags: ItemOption[];
  isLoading: boolean;
  errorMessage: string | null;
  isMutating: boolean;
  mutationError: string | null;
}

export const initialItemState: ItemState = {
  items: [],
  categories: [],
  tags: [],
  isLoading: false,
  errorMessage: null,
  isMutating: false,
  mutationError: null
};

export const itemReducer = createReducer(
  initialItemState,
  on(ItemActions.loadItems, state => ({ ...state, isLoading: true, errorMessage: null })),
  on(ItemActions.loadItemsSuccess, (state, { items }) => ({ ...state, items, isLoading: false })),
  on(ItemActions.loadItemsFailure, (state, { error }) => ({ ...state, isLoading: false, errorMessage: error })),
  on(ItemActions.loadCategoriesSuccess, (state, { categories }) => ({ ...state, categories })),
  on(ItemActions.loadCategoriesFailure, (state, { error }) => ({ ...state, errorMessage: error })),
  on(ItemActions.loadTagsSuccess, (state, { tags }) => ({ ...state, tags })),
  on(ItemActions.loadTagsFailure, (state, { error }) => ({ ...state, errorMessage: error })),
  on(
    ItemActions.createItem,
    ItemActions.updateItem,
    ItemActions.deleteItem,
    ItemActions.createCategory,
    ItemActions.createTag,
    state => ({ ...state, isMutating: true, mutationError: null })
  ),
  on(
    ItemActions.createItemSuccess,
    ItemActions.updateItemSuccess,
    ItemActions.deleteItemSuccess,
    ItemActions.createCategorySuccess,
    ItemActions.createTagSuccess,
    state => ({ ...state, isMutating: false })
  ),
  on(
    ItemActions.createItemFailure,
    ItemActions.updateItemFailure,
    ItemActions.deleteItemFailure,
    ItemActions.createCategoryFailure,
    ItemActions.createTagFailure,
    (state, { error }) => ({ ...state, isMutating: false, mutationError: error })
  ),
  on(ItemActions.clearItemState, () => initialItemState)
);

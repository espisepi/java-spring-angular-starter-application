import { createFeatureSelector, createSelector } from '@ngrx/store';
import { itemFeatureKey, ItemState } from './item.reducer';

export const selectItemState = createFeatureSelector<ItemState>(itemFeatureKey);
export const selectItems = createSelector(selectItemState, state => state.items);
export const selectCategories = createSelector(selectItemState, state => state.categories);
export const selectTags = createSelector(selectItemState, state => state.tags);
export const selectIsLoading = createSelector(selectItemState, state => state.isLoading);
export const selectErrorMessage = createSelector(selectItemState, state => state.errorMessage);
export const selectIsMutating = createSelector(selectItemState, state => state.isMutating);
export const selectMutationError = createSelector(selectItemState, state => state.mutationError);

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { categoryFeatureKey, CategoryState } from './category.reducer';

export const selectState = createFeatureSelector<CategoryState>(categoryFeatureKey);
export const selectAll = createSelector(selectState, state => state.categories);
export const selectIsLoading = createSelector(selectState, state => state.isLoading);
export const selectIsMutating = createSelector(selectState, state => state.isMutating);
export const selectError = createSelector(selectState, state => state.error);

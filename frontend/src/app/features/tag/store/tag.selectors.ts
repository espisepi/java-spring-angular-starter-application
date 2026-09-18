import { createFeatureSelector, createSelector } from '@ngrx/store';
import { tagFeatureKey, TagState } from './tag.reducer';
export const selectState = createFeatureSelector<TagState>(tagFeatureKey);
export const selectAll = createSelector(selectState, state => state.tags);
export const selectIsLoading = createSelector(selectState, state => state.isLoading);
export const selectIsMutating = createSelector(selectState, state => state.isMutating);
export const selectError = createSelector(selectState, state => state.error);

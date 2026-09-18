import { createReducer, on } from '@ngrx/store';
import * as CategoryActions from './category.actions';
import { Category } from '../models/category';

export const categoryFeatureKey = 'category';
export interface CategoryState {
    categories: Category[];
    isLoading: boolean;
    isMutating: boolean;
    error: string | null;
}
export const initialCategoryState: CategoryState = { categories: [], isLoading: false, isMutating: false, error: null };

export const categoryReducer = createReducer(
    initialCategoryState,
    on(CategoryActions.load, state => ({ ...state, isLoading: true, error: null })),
    on(CategoryActions.loadSuccess, (state, { categories }) => ({ ...state, categories, isLoading: false })),
    on(CategoryActions.loadFailure, (state, { error }) => ({ ...state, isLoading: false, error })),
    on(CategoryActions.create, CategoryActions.update, CategoryActions.remove, state => ({ ...state, isMutating: true, error: null })),
    on(CategoryActions.createSuccess, CategoryActions.updateSuccess, CategoryActions.removeSuccess, state => ({ ...state, isMutating: false })),
    on(CategoryActions.createFailure, CategoryActions.updateFailure, CategoryActions.removeFailure, (state, { error }) => ({ ...state, isMutating: false, error }))
);

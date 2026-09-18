import { createAction, props } from '@ngrx/store';
import { Category, CategoryRequest } from '../models/category';

export const load = createAction('[Category] Load');
export const loadSuccess = createAction('[Category] Load Success', props<{ categories: Category[] }>());
export const loadFailure = createAction('[Category] Load Failure', props<{ error: string }>());
export const create = createAction('[Category] Create', props<{ requestId: string; request: CategoryRequest }>());
export const createSuccess = createAction('[Category] Create Success', props<{ requestId: string; category: Category }>());
export const createFailure = createAction('[Category] Create Failure', props<{ requestId: string; error: string }>());
export const update = createAction('[Category] Update', props<{ requestId: string; id: number; request: CategoryRequest }>());
export const updateSuccess = createAction('[Category] Update Success', props<{ requestId: string; category: Category }>());
export const updateFailure = createAction('[Category] Update Failure', props<{ requestId: string; error: string }>());
export const remove = createAction('[Category] Delete', props<{ requestId: string; id: number }>());
export const removeSuccess = createAction('[Category] Delete Success', props<{ requestId: string }>());
export const removeFailure = createAction('[Category] Delete Failure', props<{ requestId: string; error: string }>());

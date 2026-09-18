import { createAction, props } from '@ngrx/store';
import { Tag } from '../models/tag';
import { TagDto } from '../models/tag-dto';

export const load = createAction('[Tag] Load');
export const loadSuccess = createAction('[Tag] Load Success', props<{ tags: Tag[] }>());
export const loadFailure = createAction('[Tag] Load Failure', props<{ error: string }>());
export const create = createAction('[Tag] Create', props<{ requestId: string; request: TagDto }>());
export const createSuccess = createAction('[Tag] Create Success', props<{ requestId: string; tag: Tag }>());
export const createFailure = createAction('[Tag] Create Failure', props<{ requestId: string; error: string }>());
export const update = createAction('[Tag] Update', props<{ requestId: string; id: number; request: TagDto }>());
export const updateSuccess = createAction('[Tag] Update Success', props<{ requestId: string; tag: Tag }>());
export const updateFailure = createAction('[Tag] Update Failure', props<{ requestId: string; error: string }>());
export const remove = createAction('[Tag] Delete', props<{ requestId: string; id: number }>());
export const removeSuccess = createAction('[Tag] Delete Success', props<{ requestId: string }>());
export const removeFailure = createAction('[Tag] Delete Failure', props<{ requestId: string; error: string }>());

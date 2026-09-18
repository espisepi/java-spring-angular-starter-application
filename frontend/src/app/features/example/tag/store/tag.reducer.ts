import { createReducer, on } from '@ngrx/store';
import * as TagActions from './tag.actions';
import { Tag } from '../models/tag';

export const tagFeatureKey = 'tag';
export interface TagState { tags: Tag[]; isLoading: boolean; isMutating: boolean; error: string | null; }
export const initialTagState: TagState = { tags: [], isLoading: false, isMutating: false, error: null };
export const tagReducer = createReducer(
    initialTagState,
    on(TagActions.load, state => ({ ...state, isLoading: true, error: null })),
    on(TagActions.loadSuccess, (state, { tags }) => ({ ...state, tags, isLoading: false })),
    on(TagActions.loadFailure, (state, { error }) => ({ ...state, isLoading: false, error })),
    on(TagActions.create, TagActions.update, TagActions.remove, state => ({ ...state, isMutating: true, error: null })),
    on(TagActions.createSuccess, TagActions.updateSuccess, TagActions.removeSuccess, state => ({ ...state, isMutating: false })),
    on(TagActions.createFailure, TagActions.updateFailure, TagActions.removeFailure, (state, { error }) => ({ ...state, isMutating: false, error }))
);

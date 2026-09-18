import { createAction, props } from '@ngrx/store';
import { Item, ItemOption, ItemRequest } from '../models/Item';

export const loadItems = createAction('[Item] Load Items');
export const loadItemsSuccess = createAction('[Item] Load Items Success', props<{ items: Item[] }>());
export const loadItemsFailure = createAction('[Item] Load Items Failure', props<{ error: string }>());

export const loadItemOptions = createAction('[Item] Load Options');
export const loadCategoriesSuccess = createAction('[Item] Load Categories Success', props<{ categories: ItemOption[] }>());
export const loadCategoriesFailure = createAction('[Item] Load Categories Failure', props<{ error: string }>());
export const loadTagsSuccess = createAction('[Item] Load Tags Success', props<{ tags: ItemOption[] }>());
export const loadTagsFailure = createAction('[Item] Load Tags Failure', props<{ error: string }>());

export const createItem = createAction('[Item] Create Item', props<{ requestId: string; request: ItemRequest }>());
export const createItemSuccess = createAction('[Item] Create Item Success', props<{ requestId: string; item: Item }>());
export const createItemFailure = createAction('[Item] Create Item Failure', props<{ requestId: string; error: string }>());

export const updateItem = createAction('[Item] Update Item', props<{ requestId: string; id: number; request: ItemRequest }>());
export const updateItemSuccess = createAction('[Item] Update Item Success', props<{ requestId: string; item: Item }>());
export const updateItemFailure = createAction('[Item] Update Item Failure', props<{ requestId: string; error: string }>());

export const deleteItem = createAction('[Item] Delete Item', props<{ requestId: string; id: number }>());
export const deleteItemSuccess = createAction('[Item] Delete Item Success', props<{ requestId: string }>());
export const deleteItemFailure = createAction('[Item] Delete Item Failure', props<{ requestId: string; error: string }>());

export const createCategory = createAction('[Item] Create Category', props<{ requestId: string; name: string }>());
export const createCategorySuccess = createAction('[Item] Create Category Success', props<{ requestId: string; category: ItemOption }>());
export const createCategoryFailure = createAction('[Item] Create Category Failure', props<{ requestId: string; error: string }>());

export const createTag = createAction('[Item] Create Tag', props<{ requestId: string; name: string }>());
export const createTagSuccess = createAction('[Item] Create Tag Success', props<{ requestId: string; tag: ItemOption }>());
export const createTagFailure = createAction('[Item] Create Tag Failure', props<{ requestId: string; error: string }>());

export const clearItemState = createAction('[Item] Clear State');

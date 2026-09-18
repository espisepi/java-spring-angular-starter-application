import { Observable } from 'rxjs';
import { Item, ItemOption, ItemRequest } from '../models/Item';

export abstract class ItemFacade {
  abstract readonly items$: Observable<Item[]>;
  abstract readonly isLoading$: Observable<boolean>;
  abstract readonly errorMessage$: Observable<string | null>;
  abstract readonly categories$: Observable<ItemOption[]>;
  abstract readonly tags$: Observable<ItemOption[]>;
  abstract readonly isMutating$: Observable<boolean>;
  abstract readonly mutationError$: Observable<string | null>;

  abstract loadItems(): void;
  abstract refreshItems(): void;
  abstract loadOptions(): void;
  abstract createCategory(name: string): Observable<ItemOption>;
  abstract createTag(name: string): Observable<ItemOption>;
  abstract createItem(request: ItemRequest): Observable<Item>;
  abstract updateItem(id: number, request: ItemRequest): Observable<Item>;
  abstract deleteItem(id: number): Observable<void>;
  abstract invalidateCache(): void;
}

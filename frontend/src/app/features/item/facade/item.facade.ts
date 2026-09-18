import { Injectable, inject, signal } from '@angular/core';
import { catchError, EMPTY, finalize, Observable, of, shareReplay, tap } from 'rxjs';
import { Item, ItemOption, ItemRequest } from '../models/Item';
import { ItemConnector } from '../connectors/item.connector';

@Injectable({ providedIn: 'root' })
export class ItemFacade {
  private readonly connector = inject(ItemConnector);

  private readonly itemsState = signal<Item[]>([]);
  private readonly loadingState = signal(false);
  private readonly errorMessageState = signal<string | null>(null);
  private readonly categoriesState = signal<ItemOption[]>([]);
  private readonly tagsState = signal<ItemOption[]>([]);
  private hasLoaded = false;
  private cacheVersion = 0;
  private itemsRequest$: Observable<Item[]> | null = null;

  readonly items = this.itemsState.asReadonly();
  readonly isLoading = this.loadingState.asReadonly();
  readonly errorMessage = this.errorMessageState.asReadonly();
  readonly categories = this.categoriesState.asReadonly();
  readonly tags = this.tagsState.asReadonly();

  loadItems(): void {
    this.loadItems$().pipe(catchError(() => EMPTY)).subscribe();
  }

  refreshItems(): void {
    this.refreshItems$().pipe(catchError(() => EMPTY)).subscribe();
  }

  loadOptions(): void {
    this.connector.getCategories().subscribe({ next: categories => this.categoriesState.set(categories) });
    this.connector.getTags().subscribe({ next: tags => this.tagsState.set(tags) });
  }

  createCategory(name: string): Observable<ItemOption> {
    return this.connector.createCategory(name).pipe(tap(() => this.loadOptions()));
  }

  createTag(name: string): Observable<ItemOption> {
    return this.connector.createTag(name).pipe(tap(() => this.loadOptions()));
  }

  createItem(request: ItemRequest): Observable<Item> {
    return this.connector.createItem(request).pipe(tap(() => this.invalidateCache()));
  }

  updateItem(id: number, request: ItemRequest): Observable<Item> {
    return this.connector.updateItem(id, request).pipe(tap(() => this.invalidateCache()));
  }

  deleteItem(id: number): Observable<void> {
    return this.connector.deleteItem(id).pipe(tap(() => this.invalidateCache()));
  }

  loadItems$(): Observable<Item[]> {
    return this.hasLoaded ? of(this.items()) : this.requestItems$();
  }

  refreshItems$(): Observable<Item[]> {
    return this.requestItems$();
  }

  invalidateCache(): void {
    this.hasLoaded = false;
    this.cacheVersion++;
  }

  private requestItems$(): Observable<Item[]> {
    if (this.itemsRequest$) {
      return this.itemsRequest$;
    }

    this.loadingState.set(true);
    this.errorMessageState.set(null);
    const requestVersion = this.cacheVersion;

    this.itemsRequest$ = this.connector.getItems().pipe(
      tap({
        next: items => {
          if (requestVersion === this.cacheVersion) {
            this.itemsState.set(items);
            this.hasLoaded = true;
          }
        },
        error: (error: unknown) => {
          if (requestVersion === this.cacheVersion) {
            this.errorMessageState.set(this.getErrorMessage(error));
          }
        }
      }),
      finalize(() => {
        this.loadingState.set(false);
        this.itemsRequest$ = null;
      }),
      shareReplay({ bufferSize: 1, refCount: true })
    );

    return this.itemsRequest$;
  }

  private getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }

    if (typeof error === 'object' && error !== null && 'message' in error) {
      return String(error.message);
    }

    return 'Unable to load items.';
  }
}

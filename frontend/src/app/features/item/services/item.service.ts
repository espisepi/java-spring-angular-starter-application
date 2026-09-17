import { Injectable, inject, signal } from '@angular/core';
import { finalize, Observable, of, shareReplay, tap } from 'rxjs';
import { Item } from '../models/Item';
import { ItemApiService } from './item-api.service';

@Injectable({ providedIn: 'root' })
export class ItemService {

  private readonly api = inject(ItemApiService);

  private readonly itemsState = signal<Item[]>([]);
  private readonly loadingState = signal(false);
  private readonly errorMessageState = signal<string | null>(null);
  private hasLoaded = false;
  private itemsRequest$: Observable<Item[]> | null = null;

  readonly items = this.itemsState.asReadonly();
  readonly isLoading = this.loadingState.asReadonly();
  readonly errorMessage = this.errorMessageState.asReadonly();

  loadItems(): void {
    this.loadItems$().subscribe({
      error: () => undefined
    });
  }

  refreshItems(): void {
    this.refreshItems$().subscribe({
      error: () => undefined
    });
  }

  loadItems$(): Observable<Item[]> {
    if (this.hasLoaded) {
      return of(this.items());
    }

    return this.fetchItems$();
  }

  refreshItems$(): Observable<Item[]> {
    return this.fetchItems$();
  }

  invalidateCache(): void {
    this.hasLoaded = false;
  }

  private fetchItems$(): Observable<Item[]> {
    if (this.itemsRequest$) {
      return this.itemsRequest$;
    }

    this.loadingState.set(true);
    this.errorMessageState.set(null);

    this.itemsRequest$ = this.api.getItems().pipe(
      tap({
        next: items => {
          this.itemsState.set(items);
          this.hasLoaded = true;
        },
        error: (error: unknown) => {
          this.errorMessageState.set(this.getErrorMessage(error));
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

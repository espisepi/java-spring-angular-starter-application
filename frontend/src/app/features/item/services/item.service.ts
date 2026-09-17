import { Injectable, inject, signal } from '@angular/core';
import { catchError, EMPTY, finalize, Observable, of, shareReplay, tap } from 'rxjs';
import { Item } from '../models/Item';
import { ItemApiService } from './item-api.service';

@Injectable({ providedIn: 'root' })
export class ItemService {

  private readonly itemApiService = inject(ItemApiService);

  private readonly itemsState = signal<Item[]>([]);
  private readonly loadingState = signal(false);
  private readonly errorMessageState = signal<string | null>(null);
  private hasLoaded = false;
  private cacheVersion = 0;
  private itemsRequest$: Observable<Item[]> | null = null;

  readonly items = this.itemsState.asReadonly();
  readonly isLoading = this.loadingState.asReadonly();
  readonly errorMessage = this.errorMessageState.asReadonly();

  loadItems(): void {
    this.loadItems$()
      .pipe(catchError(() => EMPTY))
      .subscribe();
  }

  refreshItems(): void {
    this.refreshItems$()
      .pipe(catchError(() => EMPTY))
      .subscribe();
  }

  loadItems$(): Observable<Item[]> {
    if (this.hasLoaded) {
      return of(this.items());
    }

    return this.requestItems$();
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

    this.itemsRequest$ = this.itemApiService.getItems().pipe(
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

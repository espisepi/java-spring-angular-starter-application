import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { finalize, Observable, of, shareReplay, tap } from 'rxjs';
import { Item } from '../models/Item';

@Injectable({ providedIn: 'root' })
export class ItemService {

  private readonly http = inject(HttpClient);

  private readonly itemsEndpoint = 'http://localhost:8080/api/items';

  private readonly itemsState = signal<Item[]>([]);
  private readonly loadingState = signal(false);
  private readonly errorMessageState = signal<string | null>(null);
  private hasLoaded = false;
  private itemsRequest$: Observable<Item[]> | null = null;

  readonly items = this.itemsState.asReadonly();
  readonly isLoading = this.loadingState.asReadonly();
  readonly errorMessage = this.errorMessageState.asReadonly();

  loadItems(forceReload = false): void {
    this.loadItems$(forceReload).subscribe({
      error: () => undefined
    });
  }

  loadItems$(forceReload = false): Observable<Item[]> {
    if (!forceReload && this.hasLoaded) {
      return of(this.items());
    }

    if (this.itemsRequest$) {
      return this.itemsRequest$;
    }

    this.loadingState.set(true);
    this.errorMessageState.set(null);

    this.itemsRequest$ = this.http.get<Item[]>(this.itemsEndpoint).pipe(
      tap({
        next: items => {
          this.itemsState.set(items);
          this.hasLoaded = true;
        },
        error: (error: unknown) => {
          console.error('Failed to load items', error);
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

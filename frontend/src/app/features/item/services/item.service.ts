import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { catchError, finalize, Observable, of } from 'rxjs';
import { Item } from '../models/Item';

@Injectable({ providedIn: 'root' })
export class ItemService {
  private readonly http = inject(HttpClient);
  private readonly itemsEndpoint = 'http://localhost:8080/api/items';
  private readonly loadingState = signal(false);
  private readonly errorMessageState = signal<string | null>(null);

  readonly isLoading = this.loadingState.asReadonly();
  readonly errorMessage = this.errorMessageState.asReadonly();

  getItems(): Observable<Item[]> {
    this.loadingState.set(true);
    this.errorMessageState.set(null);

    return this.http.get<Item[]>(this.itemsEndpoint).pipe(
      catchError((error: unknown) => {
        console.error('Failed to load items', error);
        this.errorMessageState.set(this.getErrorMessage(error));
        return of([]);
      }),
      finalize(() => this.loadingState.set(false))
    );
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

// src/app/item.service.ts
import { Injectable, Signal, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap } from 'rxjs';
import { Item } from '../models/Item';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export class ItemService {
  private apiUrl = 'http://localhost:8080/api/items';
  private loading = signal(false);
  private error = signal<Error | null>(null);


  constructor(private http: HttpClient) { }

  getItems(): Observable<Item[]> {
    this.loading.set(true);

    return this.http.get<Item[]>(this.apiUrl).pipe(
      tap(() => this.loading.set(false)),
      catchError((error) => {
        console.error('Error fetching items:', error);
        this.loading.set(false);
        this.error.set(error);
        return [];
      })
    );
  }

  getLoading(): boolean {
    return this.loading();
  }

  getLoadingSignal(): Signal<boolean> {
    return this.loading;
  }

  getLoadingObservable(): Observable<boolean> {
    return toObservable(this.loading);
  }

  getError(): Error | null {
    return this.error();
  }

  getErrorSignal(): Signal<Error | null> {
    return this.error;
  }

  getErrorObservable(): Observable<Error | null> {
    return toObservable(this.error);
  }

}

import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ItemAdapter } from '../adapters/item.adapter';
import { ItemRestAdapter } from '../adapters/item-rest.adapter';
import { ItemFacade } from './item.facade';
import { ItemService } from '../services/item.service';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { itemFeatureKey, itemReducer } from '../store/item.reducer';
import { ItemEffects } from '../store/item.effects';
import { Item } from '../models/Item';

describe('ItemFacade', () => {
  let facade: ItemFacade;
  let httpTestingController: HttpTestingController;
  let items: Item[];
  let isLoading: boolean;
  let errorMessage: string | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: ItemAdapter, useClass: ItemRestAdapter },
        { provide: ItemFacade, useExisting: ItemService },
        provideStore({ [itemFeatureKey]: itemReducer }),
        provideEffects([ItemEffects])
      ]
    });
    facade = TestBed.inject(ItemFacade);
    httpTestingController = TestBed.inject(HttpTestingController);
    facade.items$.subscribe(value => items = value);
    facade.isLoading$.subscribe(value => isLoading = value);
    facade.errorMessage$.subscribe(value => errorMessage = value);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(facade).toBeTruthy();
  });

  it('loads items and updates the state', () => {
    facade.loadItems();

    expect(isLoading).toBeTrue();
    const request = httpTestingController.expectOne('http://localhost:8080/api/items');
    request.flush([{ id: 1, name: 'Item 1' }]);

    expect(items).toEqual([{ id: 1, name: 'Item 1' }]);
    expect(isLoading).toBeFalse();
    expect(errorMessage).toBeNull();
  });

  it('uses the cache after the first successful load', () => {
    facade.loadItems();
    httpTestingController.expectOne('http://localhost:8080/api/items').flush([]);

    expect(items).toEqual([]);
    httpTestingController.verify();
  });

  it('refreshes items when explicitly requested', () => {
    facade.loadItems();
    httpTestingController.expectOne('http://localhost:8080/api/items').flush([]);

    facade.refreshItems();
    httpTestingController.expectOne('http://localhost:8080/api/items')
      .flush([{ id: 2, name: 'Updated item' }]);

    expect(items).toEqual([{ id: 2, name: 'Updated item' }]);
  });

  it('allows retrying after an error', () => {
    facade.loadItems();
    httpTestingController.expectOne('http://localhost:8080/api/items')
      .flush('Server error', { status: 500, statusText: 'Server Error' });

    expect(errorMessage).toBeTruthy();

    facade.loadItems();
    const retryRequest = httpTestingController.expectOne('http://localhost:8080/api/items');
    retryRequest.flush([{ id: 1, name: 'Recovered item' }]);

    expect(items).toEqual([{ id: 1, name: 'Recovered item' }]);
    expect(errorMessage).toBeNull();
  });

  it('shares concurrent requests', () => {
    facade.loadItems();
    facade.loadItems();
    const request = httpTestingController.expectOne('http://localhost:8080/api/items');
    request.flush([]);
    expect(items).toEqual([]);
  });

  it('invalidates the cache', () => {
    facade.loadItems();
    httpTestingController.expectOne('http://localhost:8080/api/items').flush([]);

    facade.invalidateCache();
    facade.loadItems();

    httpTestingController.expectOne('http://localhost:8080/api/items').flush([]);
    expect(items).toEqual([]);
  });
});

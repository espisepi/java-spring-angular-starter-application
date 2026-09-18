import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ItemAdapter } from '../adapters/item.adapter';
import { ItemRestAdapter } from '../adapters/item-rest.adapter';
import { ItemFacade } from './item.facade';

describe('ItemFacade', () => {
  let facade: ItemFacade;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: ItemAdapter, useClass: ItemRestAdapter }
      ]
    });
    facade = TestBed.inject(ItemFacade);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(facade).toBeTruthy();
  });

  it('loads items and updates the state', () => {
    facade.loadItems();

    expect(facade.isLoading()).toBeTrue();
    const request = httpTestingController.expectOne('http://localhost:8080/api/items');
    request.flush([{ id: 1, name: 'Item 1' }]);

    expect(facade.items()).toEqual([{ id: 1, name: 'Item 1' }]);
    expect(facade.isLoading()).toBeFalse();
    expect(facade.errorMessage()).toBeNull();
  });

  it('uses the cache after the first successful load', () => {
    facade.loadItems();
    httpTestingController.expectOne('http://localhost:8080/api/items').flush([]);

    let items: unknown;
    facade.loadItems$().subscribe(value => items = value);

    expect(items).toEqual([]);
    httpTestingController.verify();
  });

  it('refreshes items when explicitly requested', () => {
    facade.loadItems();
    httpTestingController.expectOne('http://localhost:8080/api/items').flush([]);

    let items: unknown;
    facade.refreshItems$().subscribe(value => items = value);
    httpTestingController.expectOne('http://localhost:8080/api/items')
      .flush([{ id: 2, name: 'Updated item' }]);

    expect(items).toEqual([{ id: 2, name: 'Updated item' }]);
  });

  it('allows retrying after an error', () => {
    facade.loadItems();
    httpTestingController.expectOne('http://localhost:8080/api/items')
      .flush('Server error', { status: 500, statusText: 'Server Error' });

    expect(facade.errorMessage()).toBeTruthy();

    facade.loadItems();
    const retryRequest = httpTestingController.expectOne('http://localhost:8080/api/items');
    retryRequest.flush([{ id: 1, name: 'Recovered item' }]);

    expect(facade.items()).toEqual([{ id: 1, name: 'Recovered item' }]);
    expect(facade.errorMessage()).toBeNull();
  });

  it('shares concurrent requests', () => {
    const firstRequest = facade.loadItems$();
    const secondRequest = facade.loadItems$();

    firstRequest.subscribe();
    secondRequest.subscribe();

    expect(firstRequest).toBe(secondRequest);
    const request = httpTestingController.expectOne('http://localhost:8080/api/items');
    request.flush([]);
  });

  it('invalidates the cache', () => {
    facade.loadItems();
    httpTestingController.expectOne('http://localhost:8080/api/items').flush([]);

    facade.invalidateCache();
    facade.loadItems();

    httpTestingController.expectOne('http://localhost:8080/api/items').flush([]);
    expect(facade.items()).toEqual([]);
  });
});

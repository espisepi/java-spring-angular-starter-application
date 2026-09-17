import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ItemService } from './item.service';

describe('ItemService', () => {
  let service: ItemService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(ItemService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('loads items and updates the state', () => {
    service.loadItems();

    expect(service.isLoading()).toBeTrue();
    const request = httpTestingController.expectOne('http://localhost:8080/api/items');
    request.flush([{ id: 1, name: 'Item 1' }]);

    expect(service.items()).toEqual([{ id: 1, name: 'Item 1' }]);
    expect(service.isLoading()).toBeFalse();
    expect(service.errorMessage()).toBeNull();
  });

  it('uses the cache after the first successful load', () => {
    service.loadItems();
    httpTestingController.expectOne('http://localhost:8080/api/items').flush([]);

    let items: unknown;
    service.loadItems$().subscribe(value => items = value);

    expect(items).toEqual([]);
    httpTestingController.verify();
  });

  it('refreshes items when explicitly requested', () => {
    service.loadItems();
    httpTestingController.expectOne('http://localhost:8080/api/items').flush([]);

    let items: unknown;
    service.refreshItems$().subscribe(value => items = value);
    httpTestingController.expectOne('http://localhost:8080/api/items')
      .flush([{ id: 2, name: 'Updated item' }]);

    expect(items).toEqual([{ id: 2, name: 'Updated item' }]);
  });

  it('allows retrying after an error', () => {
    service.loadItems();
    httpTestingController.expectOne('http://localhost:8080/api/items')
      .flush('Server error', { status: 500, statusText: 'Server Error' });

    expect(service.errorMessage()).toBeTruthy();

    service.loadItems();
    const retryRequest = httpTestingController.expectOne('http://localhost:8080/api/items');
    retryRequest.flush([{ id: 1, name: 'Recovered item' }]);

    expect(service.items()).toEqual([{ id: 1, name: 'Recovered item' }]);
    expect(service.errorMessage()).toBeNull();
  });

  it('shares concurrent requests', () => {
    const firstRequest = service.loadItems$();
    const secondRequest = service.loadItems$();

    expect(firstRequest).toBe(secondRequest);
    const request = httpTestingController.expectOne('http://localhost:8080/api/items');
    request.flush([]);
  });

  it('invalidates the cache', () => {
    service.loadItems();
    httpTestingController.expectOne('http://localhost:8080/api/items').flush([]);

    service.invalidateCache();
    service.loadItems();

    httpTestingController.expectOne('http://localhost:8080/api/items').flush([]);
  });
});

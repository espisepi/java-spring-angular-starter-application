import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

import { ItemListComponent } from './item-list.component';
import { ItemAdapter } from '../../adapters/item.adapter';
import { ItemRestAdapter } from '../../adapters/item-rest.adapter';
import { ItemFacade } from '../../facade/item.facade';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { itemFeatureKey, itemReducer } from '../../store/item.reducer';
import { ItemEffects } from '../../store/item.effects';

describe('ItemListComponent', () => {
  let component: ItemListComponent;
  let fixture: ComponentFixture<ItemListComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemListComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        { provide: ItemAdapter, useClass: ItemRestAdapter },
        provideStore({ [itemFeatureKey]: itemReducer }),
        provideEffects([ItemEffects])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ItemListComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
    httpTestingController.expectOne('http://localhost:8080/api/items').flush([]);
    httpTestingController.expectOne('http://localhost:8080/api/item-categories').flush([]);
    httpTestingController.expectOne('http://localhost:8080/api/item-tags').flush([]);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ItemAdapter } from './features/item/adapters/item.adapter';
import { ItemRestAdapter } from './features/item/adapters/item-rest.adapter';
import { ItemFacade } from './features/item/facade/item.facade';
import { ItemService } from './features/item/services/item.service';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { itemFeatureKey, itemReducer } from './features/item/store/item.reducer';
import { ItemEffects } from './features/item/store/item.effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    { provide: ItemAdapter, useClass: ItemRestAdapter },
    { provide: ItemFacade, useExisting: ItemService },
    provideStore({ [itemFeatureKey]: itemReducer }),
    provideEffects([ItemEffects]),
    // Remove the following line if you don't want to use the Redux DevTools extension
    provideStoreDevtools({
      name: 'GygaMonster Sepinaco',
      maxAge: 50,
      logOnly: environment.production,
      trace: !environment.production,
      traceLimit: 25
    }),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes)
  ]
};

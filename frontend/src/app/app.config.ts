import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ItemAdapter } from './features/item/adapters/item.adapter';
import { ItemRestAdapter } from './features/item/adapters/item-rest.adapter';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { itemFeatureKey, itemReducer } from './features/item/store/item.reducer';
import { ItemEffects } from './features/item/store/item.effects';
import { CategoryAdapter } from './features/category/adapters/category.adapter';
import { CategoryRestAdapter } from './features/category/adapters/category-rest.adapter';
import { categoryFeatureKey, categoryReducer } from './features/category/store/category.reducer';
import { CategoryEffects } from './features/category/store/category.effects';
import { TagAdapter } from './features/tag/adapters/tag.adapter';
import { TagRestAdapter } from './features/tag/adapters/tag-rest.adapter';
import { tagFeatureKey, tagReducer } from './features/tag/store/tag.reducer';
import { TagEffects } from './features/tag/store/tag.effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    { provide: ItemAdapter, useClass: ItemRestAdapter },
    { provide: CategoryAdapter, useClass: CategoryRestAdapter },
    { provide: TagAdapter, useClass: TagRestAdapter },
    provideStore({ [itemFeatureKey]: itemReducer, [categoryFeatureKey]: categoryReducer, [tagFeatureKey]: tagReducer }),
    provideEffects([ItemEffects, CategoryEffects, TagEffects]),
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

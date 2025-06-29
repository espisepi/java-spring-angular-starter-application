import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ItemListComponent } from './app/components/item-list/item-list.component';

bootstrapApplication(ItemListComponent, {
  providers: [provideHttpClient(withInterceptorsFromDi())]
}).catch(err => console.error(err));
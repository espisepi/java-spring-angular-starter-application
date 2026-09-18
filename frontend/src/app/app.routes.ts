import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'items',
    pathMatch: 'full'
  },
  {
    path: 'items',
    loadComponent: () => import('./features/item/components/item-list/item-list.component').then(m => m.ItemListComponent)
  },
  {
    path: 'categories',
    loadComponent: () => import('./features/category/components/category-list/category-list.component').then(m => m.CategoryListComponent)
  },
  {
    path: 'tags',
    loadComponent: () => import('./features/tag/components/tag-list/tag-list.component').then(m => m.TagListComponent)
  }
];

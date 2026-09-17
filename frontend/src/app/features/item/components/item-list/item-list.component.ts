// src/app/item-list.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemService } from '../../services/item.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent {
  private readonly itemService = inject(ItemService);

  readonly items = this.itemService.items;
  readonly isLoading = this.itemService.isLoading;
  readonly errorMessage = this.itemService.errorMessage;

  constructor() {
    this.itemService.loadItems();
  }
}

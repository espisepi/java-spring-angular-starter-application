// src/app/item-list.component.ts
import { Component, inject, OnInit, signal, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemService } from '../../services/item.service';
import { HttpClientModule } from '@angular/common/http';
import { Item } from '../../models/Item';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent {

  itemService: ItemService = inject(ItemService);

  items: Signal<Item[]> = toSignal(this.itemService.getItems(), { initialValue: [] });

  constructor() { }

}

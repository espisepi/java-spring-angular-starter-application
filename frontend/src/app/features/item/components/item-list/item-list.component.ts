import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ItemService } from '../../services/item.service';
import { Item, ItemRequest } from '../../models/Item';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent {
  private readonly itemService = inject(ItemService);
  private readonly formBuilder = inject(FormBuilder);

  readonly items = this.itemService.items;
  readonly isLoading = this.itemService.isLoading;
  readonly errorMessage = this.itemService.errorMessage;
  readonly categories = this.itemService.categories;
  readonly tags = this.itemService.tags;
  readonly editingId = signal<number | null>(null);
  readonly selectedItem = signal<Item | null>(null);
  readonly actionMessage = signal<string | null>(null);
  readonly actionError = signal<string | null>(null);
  readonly newCategoryName = this.formBuilder.control('', { nonNullable: true });
  readonly newTagName = this.formBuilder.control('', { nonNullable: true });

  readonly itemForm = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(255)]],
    description: ['', Validators.required],
    categoryId: [0, [Validators.required, Validators.min(1)]],
    tagIds: [[] as number[]],
    relatedItemIds: [[] as number[]]
  });

  constructor() {
    this.itemService.loadItems();
    this.itemService.loadOptions();
  }

  submit(): void {
    this.itemForm.markAllAsTouched();
    if (this.itemForm.invalid) {
      return;
    }

    const request: ItemRequest = this.itemForm.getRawValue();
    const editingId = this.editingId();
    const operation$ = editingId === null
      ? this.itemService.createItem(request)
      : this.itemService.updateItem(editingId, request);

    this.actionMessage.set(null);
    this.actionError.set(null);
    operation$.subscribe({
      next: () => {
        this.actionMessage.set(editingId === null ? 'Item creado correctamente.' : 'Item actualizado correctamente.');
        this.resetForm();
        this.itemService.refreshItems();
      },
      error: error => this.actionError.set(this.getErrorMessage(error))
    });
  }

  edit(item: Item): void {
    this.editingId.set(item.id);
    this.selectedItem.set(null);
    this.itemForm.setValue({
      name: item.name,
      description: item.detail?.description ?? '',
      categoryId: item.category?.id ?? 0,
      tagIds: item.tags?.map(tag => tag.id) ?? [],
      relatedItemIds: item.relatedItems?.map(relatedItem => relatedItem.id) ?? []
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  showDetails(item: Item): void {
    this.selectedItem.set(this.selectedItem()?.id === item.id ? null : item);
  }

  refresh(): void {
    this.itemService.refreshItems();
  }

  createCategory(): void {
    const name = this.newCategoryName.value.trim();
    if (!name) return;
    this.itemService.createCategory(name).subscribe({
      next: category => {
        this.newCategoryName.reset();
        this.itemService.loadOptions();
        this.itemForm.controls.categoryId.setValue(category.id);
      },
      error: error => this.actionError.set(this.getErrorMessage(error))
    });
  }

  createTag(): void {
    const name = this.newTagName.value.trim();
    if (!name) return;
    this.itemService.createTag(name).subscribe({
      next: tag => {
        this.newTagName.reset();
        this.itemService.loadOptions();
        this.itemForm.controls.tagIds.setValue([...this.itemForm.controls.tagIds.value, tag.id]);
      },
      error: error => this.actionError.set(this.getErrorMessage(error))
    });
  }

  delete(item: Item): void {
    if (!window.confirm(`¿Eliminar el item "${item.name}"?`)) {
      return;
    }

    this.actionMessage.set(null);
    this.actionError.set(null);
    this.itemService.deleteItem(item.id).subscribe({
      next: () => {
        this.actionMessage.set('Item eliminado correctamente.');
        this.itemService.refreshItems();
        if (this.selectedItem()?.id === item.id) {
          this.selectedItem.set(null);
        }
      },
      error: error => this.actionError.set(this.getErrorMessage(error))
    });
  }

  resetForm(): void {
    this.editingId.set(null);
    this.itemForm.reset({ name: '', description: '', categoryId: 0, tagIds: [], relatedItemIds: [] });
  }

  private getErrorMessage(error: unknown): string {
    if (typeof error === 'object' && error !== null && 'error' in error) {
      const response = error.error;
      if (typeof response === 'object' && response !== null && 'message' in response) {
        return String(response.message);
      }
    }
    return 'No se pudo completar la operación.';
  }
}

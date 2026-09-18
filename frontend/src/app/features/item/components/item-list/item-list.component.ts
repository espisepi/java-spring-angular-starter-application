import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { ItemFacade } from '../../facade/item.facade';
import { Item } from '../../models/Item';
import { ItemDto } from '../../models/item-dto';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent {
  private readonly itemFacade = inject(ItemFacade);
  private readonly formBuilder = inject(FormBuilder);

  readonly items = toSignal(this.itemFacade.items$, { initialValue: [] });
  readonly isLoading = toSignal(this.itemFacade.isLoading$, { initialValue: false });
  readonly errorMessage = toSignal(this.itemFacade.errorMessage$, { initialValue: null });
  readonly categories = toSignal(this.itemFacade.categories$, { initialValue: [] });
  readonly tags = toSignal(this.itemFacade.tags$, { initialValue: [] });
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
    this.itemFacade.loadItems();
    this.itemFacade.loadOptions();
  }

  submit(): void {
    this.itemForm.markAllAsTouched();
    if (this.itemForm.invalid) {
      return;
    }

    const request: ItemDto = this.itemForm.getRawValue();
    const editingId = this.editingId();
    const operation$ = editingId === null
      ? this.itemFacade.createItem(request)
      : this.itemFacade.updateItem(editingId, request);

    this.actionMessage.set(null);
    this.actionError.set(null);
    operation$.subscribe({
      next: () => {
        this.actionMessage.set(editingId === null ? 'Item creado correctamente.' : 'Item actualizado correctamente.');
        this.resetForm();
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
    this.itemFacade.refreshItems();
  }

  createCategory(): void {
    const name = this.newCategoryName.value.trim();
    if (!name) return;
    this.itemFacade.createCategory(name).subscribe({
      next: category => {
        this.newCategoryName.reset();
        this.itemForm.controls.categoryId.setValue(category.id);
      },
      error: error => this.actionError.set(this.getErrorMessage(error))
    });
  }

  createTag(): void {
    const name = this.newTagName.value.trim();
    if (!name) return;
    this.itemFacade.createTag(name).subscribe({
      next: tag => {
        this.newTagName.reset();
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
    this.itemFacade.deleteItem(item.id).subscribe({
      next: () => {
        this.actionMessage.set('Item eliminado correctamente.');
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

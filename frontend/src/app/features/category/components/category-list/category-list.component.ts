import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { CategoryFacade } from '../../facade/category.facade';
import { Category } from '../../models/category';

@Component({
    selector: 'app-category-list',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterLink],
    templateUrl: './category-list.component.html'
})
export class CategoryListComponent {
    private readonly facade = inject(CategoryFacade);
    private readonly builder = inject(FormBuilder);
    readonly categories = toSignal(this.facade.categories$, { initialValue: [] });
    readonly isLoading = toSignal(this.facade.isLoading$, { initialValue: false });
    readonly isMutating = toSignal(this.facade.isMutating$, { initialValue: false });
    readonly error = toSignal(this.facade.error$, { initialValue: null });
    readonly editingId = signal<number | null>(null);
    readonly feedback = signal<string | null>(null);
    readonly form = this.builder.nonNullable.group({ name: ['', [Validators.required, Validators.maxLength(100)]] });

    constructor() { this.facade.load(); }

    submit(): void {
        this.form.markAllAsTouched();
        if (this.form.invalid || this.isMutating()) return;
        const id = this.editingId();
        const request$ = id === null ? this.facade.create(this.form.getRawValue()) : this.facade.update(id, this.form.getRawValue());
        request$.subscribe({ next: () => { this.feedback.set(id === null ? 'Categoría creada.' : 'Categoría actualizada.'); this.reset(); }, error: error => this.feedback.set(this.message(error)) });
    }

    edit(category: Category): void { this.editingId.set(category.id); this.form.setValue({ name: category.name }); }
    remove(category: Category): void {
        if (!window.confirm(`¿Eliminar la categoría "${category.name}"?`)) return;
        this.facade.delete(category.id).subscribe({ next: () => this.feedback.set('Categoría eliminada.'), error: error => this.feedback.set(this.message(error)) });
    }
    reset(): void { this.editingId.set(null); this.form.reset({ name: '' }); }
    private message(error: unknown): string { return error instanceof Error ? error.message : 'No se pudo completar la operación.'; }
}

import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { TagFacade } from '../../facade/tag.facade';
import { Tag } from '../../models/tag';

@Component({ selector: 'app-tag-list', standalone: true, imports: [CommonModule, ReactiveFormsModule, RouterLink], templateUrl: './tag-list.component.html' })
export class TagListComponent {
  private readonly facade = inject(TagFacade);
  private readonly builder = inject(FormBuilder);
  readonly tags = toSignal(this.facade.tags$, { initialValue: [] });
  readonly isLoading = toSignal(this.facade.isLoading$, { initialValue: false });
  readonly isMutating = toSignal(this.facade.isMutating$, { initialValue: false });
  readonly error = toSignal(this.facade.error$, { initialValue: null });
  readonly editingId = signal<number | null>(null);
  readonly feedback = signal<string | null>(null);
  readonly form = this.builder.nonNullable.group({ name: ['', [Validators.required, Validators.maxLength(100)]] });
  constructor() { this.facade.load(); }
  submit(): void { this.form.markAllAsTouched(); if (this.form.invalid || this.isMutating()) return; const id = this.editingId(); const request$ = id === null ? this.facade.create(this.form.getRawValue()) : this.facade.update(id, this.form.getRawValue()); request$.subscribe({ next: () => { this.feedback.set(id === null ? 'Tag creado.' : 'Tag actualizado.'); this.reset(); }, error: error => this.feedback.set(this.message(error)) }); }
  edit(tag: Tag): void { this.editingId.set(tag.id); this.form.setValue({ name: tag.name }); }
  remove(tag: Tag): void { if (!window.confirm(`¿Eliminar el tag "${tag.name}"?`)) return; this.facade.delete(tag.id).subscribe({ next: () => this.feedback.set('Tag eliminado.'), error: error => this.feedback.set(this.message(error)) }); }
  reset(): void { this.editingId.set(null); this.form.reset({ name: '' }); }
  private message(error: unknown): string { return error instanceof Error ? error.message : 'No se pudo completar la operación.'; }
}

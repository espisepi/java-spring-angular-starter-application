import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Tag, TagRequest } from '../models/tag';
import { TagAdapter } from '../adapters/tag.adapter';

@Injectable({ providedIn: 'root' })
export class TagConnector {
  private readonly adapter = inject(TagAdapter);
  getAll(): Observable<Tag[]> { return this.adapter.getAll(); }
  create(request: TagRequest): Observable<Tag> { return this.adapter.create(request); }
  update(id: number, request: TagRequest): Observable<Tag> { return this.adapter.update(id, request); }
  delete(id: number): Observable<void> { return this.adapter.delete(id); }
}

import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Tag } from '../models/tag';
import { TagDto } from '../models/tag-dto';
import { TagAdapter } from '../adapters/tag.adapter';

@Injectable({ providedIn: 'root' })
export class TagConnector {
  private readonly adapter = inject(TagAdapter);
  getAll(): Observable<Tag[]> { return this.adapter.getAll(); }
  create(request: TagDto): Observable<Tag> { return this.adapter.create(request); }
  update(id: number, request: TagDto): Observable<Tag> { return this.adapter.update(id, request); }
  delete(id: number): Observable<void> { return this.adapter.delete(id); }
}

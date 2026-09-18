import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Tag } from '../models/tag';
import { TagDto } from '../models/tag-dto';
import { TagConnector } from '../connectors/tag.connector';

@Injectable({ providedIn: 'root' })
export class TagService {
    private readonly connector = inject(TagConnector);
    getAll(): Observable<Tag[]> { return this.connector.getAll(); }
    create(request: TagDto): Observable<Tag> { return this.connector.create(request); }
    update(id: number, request: TagDto): Observable<Tag> { return this.connector.update(id, request); }
    delete(id: number): Observable<void> { return this.connector.delete(id); }
}

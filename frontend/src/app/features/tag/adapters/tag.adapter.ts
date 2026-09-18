import { Observable } from 'rxjs';
import { Tag, TagRequest } from '../models/tag';

export abstract class TagAdapter {
  abstract getAll(): Observable<Tag[]>;
  abstract create(request: TagRequest): Observable<Tag>;
  abstract update(id: number, request: TagRequest): Observable<Tag>;
  abstract delete(id: number): Observable<void>;
}

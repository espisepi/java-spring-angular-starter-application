import { Observable } from 'rxjs';
import { Tag } from '../models/tag';
import { TagDto } from '../models/tag-dto';

export abstract class TagAdapter {
  abstract getAll(): Observable<Tag[]>;
  abstract create(request: TagDto): Observable<Tag>;
  abstract update(id: number, request: TagDto): Observable<Tag>;
  abstract delete(id: number): Observable<void>;
}

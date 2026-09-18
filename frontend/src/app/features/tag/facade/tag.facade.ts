import { Observable } from 'rxjs';
import { Tag, TagRequest } from '../models/tag';

export abstract class TagFacade {
  abstract readonly tags$: Observable<Tag[]>;
  abstract readonly isLoading$: Observable<boolean>;
  abstract readonly isMutating$: Observable<boolean>;
  abstract readonly error$: Observable<string | null>;
  abstract load(): void;
  abstract create(request: TagRequest): Observable<Tag>;
  abstract update(id: number, request: TagRequest): Observable<Tag>;
  abstract delete(id: number): Observable<void>;
}

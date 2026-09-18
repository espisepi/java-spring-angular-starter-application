import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Tag } from '../models/tag';
import { TagDto } from '../models/tag-dto';
import { TagAdapter } from './tag.adapter';

@Injectable()
export class TagRestAdapter extends TagAdapter {
  private readonly http = inject(HttpClient);
  private readonly endpoint = `${environment.apiUrl}/item-tags`;
  getAll(): Observable<Tag[]> { return this.http.get<Tag[]>(this.endpoint); }
  create(request: TagDto): Observable<Tag> { return this.http.post<Tag>(this.endpoint, request); }
  update(id: number, request: TagDto): Observable<Tag> { return this.http.put<Tag>(`${this.endpoint}/${id}`, request); }
  delete(id: number): Observable<void> { return this.http.delete<void>(`${this.endpoint}/${id}`); }
}

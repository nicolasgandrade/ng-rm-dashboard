import { inject } from '@angular/core';
import { HttpService } from '../../../core/api/http-service/http-service';
import { Observable } from 'rxjs';
import { PageableResponse } from '../../../shared/models/pageable-response.model';
import { Character } from '../models/character.model';
import { HttpClient, HttpParams } from '@angular/common/http';

export class CharactesService extends HttpService {
  private readonly http = inject(HttpClient);

  getCharacters(
    page: number,
    name = '',
  ): Observable<PageableResponse<Character>> {
    const params = new HttpParams({ fromObject: { page, name } });

    return this.http.get<PageableResponse<Character>>(
      this.getFullUrl('character'),
      this.getJsonOptions({ params }),
    );
  }
}

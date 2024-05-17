import { Injectable, inject } from '@angular/core';
import { HttpService } from '../../../core/api/http-service/http-service';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PageableResponse } from '../../../shared/models/pageable-response.model';
import { Episode } from '../models/episode.model';

@Injectable()
export class EpisodesService extends HttpService {
  private readonly http = inject(HttpClient);

  getEpisodes(page: number): Observable<PageableResponse<Episode>> {
    const params = new HttpParams({
      fromObject: { page },
    });

    return this.http.get<PageableResponse<Episode>>(
      this.getFullUrl('episode'),
      this.getJsonOptions({ params }),
    );
  }
}

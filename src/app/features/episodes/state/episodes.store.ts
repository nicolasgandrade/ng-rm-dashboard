import { ComponentStore } from '@ngrx/component-store';
import { PageableResponse } from '../../../shared/models/pageable-response.model';
import { Episode } from '../models/episode.model';
import { pageableResponseInitialState } from '../../../shared/utils/pageable-response-initial-state.model';
import { exhaustMap, finalize, map, of, tap } from 'rxjs';
import { Injectable, inject } from '@angular/core';
import { EpisodesService } from '../services/episodes.service';
import { tapResponse } from '@ngrx/operators';

interface EpisodesState {
  currentPage: number;
  loading: boolean;
  error: boolean;
  data: PageableResponse<Episode>;
}

const initialState: EpisodesState = {
  currentPage: 0,
  loading: false,
  error: false,
  data: pageableResponseInitialState,
};

@Injectable()
export class EpisodesStore extends ComponentStore<EpisodesState> {
  private readonly episodesService = inject(EpisodesService);

  public readonly listItems$ = this.select(({ data }) => data.results);
  public readonly isLoading$ = this.select(({ loading }) => loading);
  public readonly hasError$ = this.select(({ error }) => error);

  readonly getEpisodes$ = this.effect((trigger$) =>
    trigger$.pipe(
      tap(() => this.gettingEpisodes()),
      exhaustMap(() =>
        !this.state().data.info.next && this.state().currentPage !== 0
          ? of(this.getEpisodesFinished())
          : this.episodesService.getEpisodes(this.state().currentPage + 1).pipe(
              tapResponse(
                (res) => {
                  this.getEpisodesSuccess(res);
                },
                () => this.getEpisodesFailure(),
              ),
            ),
      ),
    ),
  );

  private readonly gettingEpisodes = this.updater((state) => ({
    ...state,
    loading: true,
    error: false,
  }));
  private readonly getEpisodesSuccess = this.updater(
    (state, apiRes: PageableResponse<Episode>) => ({
      ...state,
      currentPage: this.state().currentPage + 1,
      loading: false,
      error: false,
      data: {
        ...state.data,
        ...apiRes,
        results: [...state.data.results, ...apiRes.results],
      },
    }),
  );
  private readonly getEpisodesFailure = this.updater((state) => ({
    ...state,
    loading: false,
    error: true,
  }));
  private readonly getEpisodesFinished = this.updater((state) => ({
    ...state,
    loading: false,
    error: false,
  }));

  constructor() {
    super(initialState);
  }
}

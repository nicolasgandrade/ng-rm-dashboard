import { ComponentStore } from '@ngrx/component-store';
import { PageableResponse } from '../../../shared/models/pageable-response.model';
import { Episode } from '../models/episode.model';
import { pageableResponseInitialState } from '../../../shared/utils/pageable-response-initial-state.model';
import { Observable, exhaustMap, finalize, map, of, tap } from 'rxjs';
import { Injectable, inject } from '@angular/core';
import { EpisodesService } from '../services/episodes.service';
import { tapResponse } from '@ngrx/operators';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';

interface EpisodesState {
  currentPage: number;
  filtering: boolean;
  lastSearch: string;
  loading: boolean;
  error: boolean;
  data: PageableResponse<Episode>;
}

const initialState: EpisodesState = {
  currentPage: 0,
  filtering: false,
  lastSearch: '',
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

  readonly getEpisodes$ = this.effect((searchTerm$: Observable<string>) =>
    searchTerm$.pipe(
      tap((searchTerm) =>
        !!searchTerm.trim()
          ? this.filteringEpisodes(searchTerm)
          : this.gettingEpisodes(),
      ),
      exhaustMap((searchTerm) =>
        !this.state().data.info.next &&
        this.state().currentPage !== 0 &&
        !this.state().filtering
          ? of(this.getEpisodesFinished())
          : this.episodesService
              .getEpisodes(this.state().currentPage + 1, searchTerm)
              .pipe(
                tapResponse(
                  (res) => {
                    this.getEpisodesSuccess(res);
                  },
                  (error: HttpErrorResponse) =>
                    this.getEpisodesFailure(error.status),
                ),
              ),
      ),
    ),
  );

  private readonly filteringEpisodes = this.updater(
    (state, search: string) => ({
      ...state,
      currentPage:
        this.state().filtering && this.state().lastSearch === search
          ? this.state().currentPage
          : 0,
      lastSearch: search,
      filtering: true,
      loading: true,
      error: false,
    }),
  );
  private readonly gettingEpisodes = this.updater((state) => ({
    ...state,
    currentPage: this.state().filtering ? 0 : this.state().currentPage,
    filtering: false,
    loading: true,
    error: false,
    data: this.state().filtering
      ? pageableResponseInitialState
      : this.state().data,
  }));
  private readonly getEpisodesSuccess = this.updater(
    (state, apiRes: PageableResponse<Episode>) => ({
      ...state,
      currentPage: this.state().currentPage + 1,
      loading: false,
      error: false,
      data:
        this.state().filtering && this.state().currentPage === 0
          ? apiRes
          : {
              ...state.data,
              ...apiRes,
              results: [...state.data.results, ...apiRes.results],
            },
    }),
  );
  private readonly getEpisodesFailure = this.updater(
    (state, statusCode: HttpStatusCode) => ({
      ...state,
      currentPage: this.state().filtering ? 0 : this.state().currentPage,
      loading: false,
      error: statusCode === HttpStatusCode.NotFound ? false : true,
      data:
        this.state().filtering && this.state().currentPage === 0
          ? pageableResponseInitialState
          : this.state().data,
    }),
  );
  private readonly getEpisodesFinished = this.updater((state) => ({
    ...state,
    loading: false,
    error: false,
  }));

  constructor() {
    super(initialState);
  }
}

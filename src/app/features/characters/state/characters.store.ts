import { Injectable, inject } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { PageableResponse } from '../../../shared/models/pageable-response.model';
import { Character } from '../models/character.model';
import { pageableResponseInitialState } from '../../../shared/utils/pageable-response-initial-state.model';
import { CharactesService } from '../services/characters.service';
import { Observable, exhaustMap, of, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';

interface CharactersState {
  currentPage: number;
  filtering: boolean;
  lastSearch: string;
  loading: boolean;
  error: boolean;
  data: PageableResponse<Character>;
}

const initialState: CharactersState = {
  currentPage: 0,
  filtering: false,
  lastSearch: '',
  loading: false,
  error: false,
  data: pageableResponseInitialState,
};

@Injectable()
export class CharactersStore extends ComponentStore<CharactersState> {
  private readonly charactersService = inject(CharactesService);

  public readonly listItems$ = this.select(({ data }) => data.results);
  public readonly isLoading$ = this.select(({ loading }) => loading);
  public readonly hasError$ = this.select(({ error }) => error);

  readonly getCharacters$ = this.effect((searchTerm$: Observable<string>) =>
    searchTerm$.pipe(
      tap((searchTerm) =>
        !!searchTerm.trim()
          ? this.filteringCharacters(searchTerm)
          : this.gettingCharacters(),
      ),
      exhaustMap((searchTerm) =>
        !this.state().data.info.next &&
        this.state().currentPage !== 0 &&
        !this.state().filtering
          ? of(this.getCharactersFinished())
          : this.charactersService
              .getCharacters(this.state().currentPage + 1, searchTerm)
              .pipe(
                tapResponse(
                  (res) => this.getCharactersSuccess(res),
                  (error: HttpErrorResponse) =>
                    this.getCharactersFailure(error.status),
                ),
              ),
      ),
    ),
  );

  private readonly filteringCharacters = this.updater(
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
  private readonly gettingCharacters = this.updater((state) => ({
    ...state,
    currentPage: this.state().filtering ? 0 : this.state().currentPage,
    filtering: false,
    loading: true,
    error: false,
    data: this.state().filtering
      ? pageableResponseInitialState
      : this.state().data,
  }));
  private readonly getCharactersSuccess = this.updater(
    (state, data: PageableResponse<Character>) => ({
      ...state,
      currentPage: this.state().currentPage + 1,
      loading: false,
      error: false,
      data:
        this.state().filtering && this.state().currentPage === 0
          ? data
          : {
              ...state.data,
              ...data,
              results: [...state.data.results, ...data.results],
            },
    }),
  );
  private readonly getCharactersFailure = this.updater(
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
  private readonly getCharactersFinished = this.updater((state) => ({
    ...state,
    loading: false,
    error: false,
  }));

  constructor() {
    super(initialState);
  }
}

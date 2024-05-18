import { Injectable, inject } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { PageableResponse } from '../../../shared/models/pageable-response.model';
import { Character } from '../models/character.model';
import { pageableResponseInitialState } from '../../../shared/utils/pageable-response-initial-state.model';
import { CharactesService } from '../services/characters.service';
import { exhaustMap, of, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';

interface CharactersState {
  currentPage: number;
  loading: boolean;
  error: boolean;
  data: PageableResponse<Character>;
}

const initialState: CharactersState = {
  currentPage: 0,
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

  readonly getCharacters$ = this.effect((trigger$) =>
    trigger$.pipe(
      tap(() => this.gettingCharacters()),
      exhaustMap(() =>
        !this.state().data.info.next && this.state().currentPage !== 0
          ? of(this.getCharactersFinished())
          : this.charactersService
              .getCharacters(this.state().currentPage + 1)
              .pipe(
                tapResponse(
                  (res) => this.getCharactersSuccess(res),
                  () => this.getCharactersFailure(),
                ),
              ),
      ),
    ),
  );

  private readonly gettingCharacters = this.updater((state) => ({
    ...state,
    loading: true,
    error: false,
  }));
  private readonly getCharactersSuccess = this.updater(
    (state, data: PageableResponse<Character>) => ({
      ...state,
      currentPage: this.state().currentPage + 1,
      loading: false,
      error: false,
      data: {
        ...state.data,
        ...data,
        results: [...state.data.results, ...data.results],
      },
    }),
  );
  private readonly getCharactersFailure = this.updater((state) => ({
    ...state,
    loading: false,
    error: true,
  }));
  private readonly getCharactersFinished = this.updater((state) => ({
    ...state,
    loading: false,
    error: false,
  }));

  constructor() {
    super(initialState);
  }
}

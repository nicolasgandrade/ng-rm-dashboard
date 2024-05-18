import { Component, OnInit, inject } from '@angular/core';
import { ListComponent } from '../../../../shared/components/list/list.component';
import { HttpClientModule } from '@angular/common/http';
import { CharactersStore } from '../../state/characters.store';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { CharactesService } from '../../services/characters.service';
import { CharacterCardComponent } from '../../components/character-card/character-card.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { GlobalSearchService } from '../../../../shared/services/global-search.service';

@Component({
  selector: 'app-root-characters',
  standalone: true,
  imports: [
    ListComponent,
    HttpClientModule,
    CharacterCardComponent,
    InfiniteScrollModule,
  ],
  providers: [CharactersStore, CharactesService],
  templateUrl: './root-characters.component.html',
  styleUrl: './root-characters.component.scss',
})
export class RootCharactersComponent {
  private readonly charactersStore = inject(CharactersStore);
  private readonly globalSearchService = inject(GlobalSearchService);

  readonly isLoading = toSignal(this.charactersStore.isLoading$);
  readonly hasError = toSignal(this.charactersStore.hasError$);
  readonly listItems = toSignal(this.charactersStore.listItems$);

  constructor() {
    toObservable(this.globalSearchService.searchTerm).subscribe(() =>
      this.fetchCharacters(),
    );
  }

  fetchCharacters() {
    this.charactersStore.getCharacters$(this.globalSearchService.searchTerm());
  }
}

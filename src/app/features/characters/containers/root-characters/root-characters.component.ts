import { Component, OnInit, inject } from '@angular/core';
import { ListComponent } from '../../../../shared/components/list/list.component';
import { HttpClientModule } from '@angular/common/http';
import { CharactersStore } from '../../state/characters.store';
import { toSignal } from '@angular/core/rxjs-interop';
import { CharactesService } from '../../services/characters.service';

@Component({
  selector: 'app-root-characters',
  standalone: true,
  imports: [ListComponent, HttpClientModule],
  providers: [CharactersStore, CharactesService],
  templateUrl: './root-characters.component.html',
  styleUrl: './root-characters.component.scss',
})
export class RootCharactersComponent implements OnInit {
  private readonly charactersStore = inject(CharactersStore);

  isLoading = toSignal(this.charactersStore.isLoading$);
  hasError = toSignal(this.charactersStore.hasError$);
  listItems = toSignal(this.charactersStore.listItems$);

  ngOnInit(): void {
    this.charactersStore.getCharacters$();
  }
}

import { Component, OnInit, Signal, effect, inject } from '@angular/core';
import { ListComponent } from '../../../../shared/components/list/list.component';
import { EpisodesStore } from '../../state/episodes.store';
import { EpisodesService } from '../../services/episodes.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { EpisodeCardComponent } from '../../components/episode-card/episode-card.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { LoaderComponent } from '../../../../shared/components/loader/loader.component';
import { GlobalSearchService } from '../../../../shared/services/global-search.service';

@Component({
  selector: 'app-root-episodes',
  standalone: true,
  imports: [
    ListComponent,
    EpisodeCardComponent,
    LoaderComponent,
    InfiniteScrollModule,
  ],
  providers: [EpisodesStore, EpisodesService],
  templateUrl: './root-episodes.component.html',
  styleUrl: './root-episodes.component.scss',
})
export class RootEpisodesComponent implements OnInit {
  private readonly episodesStore = inject(EpisodesStore);
  private readonly globalSearchService = inject(GlobalSearchService);

  readonly isLoading = toSignal(this.episodesStore.isLoading$);
  readonly hasError = toSignal(this.episodesStore.hasError$);
  readonly listItems = toSignal(this.episodesStore.listItems$);

  constructor() {
    effect(() => console.log(this.globalSearchService.searchTerm()));
  }

  ngOnInit(): void {
    this.fetchEpisodes();
  }

  fetchEpisodes(): void {
    this.episodesStore.getEpisodes$();
  }
}

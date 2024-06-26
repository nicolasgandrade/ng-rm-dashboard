import { Component, OnInit, Signal, effect, inject } from '@angular/core';
import { ListComponent } from '../../../../shared/components/list/list.component';
import { EpisodesStore } from '../../state/episodes.store';
import { EpisodesService } from '../../services/episodes.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { EpisodeCardComponent } from '../../components/episode-card/episode-card.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { LoaderComponent } from '../../../../shared/components/loader/loader.component';
import { GlobalSearchService } from '../../../../shared/services/global-search.service';
import { Dialog } from '@angular/cdk/dialog';
import { EpisodesDetailsModalComponent } from '../../components/episodes-details-modal/episodes-details-modal.component';
import { Episode } from '../../models/episode.model';

@Component({
  selector: 'app-root-episodes',
  standalone: true,
  imports: [
    ListComponent,
    EpisodeCardComponent,
    LoaderComponent,
    InfiniteScrollModule,
    EpisodesDetailsModalComponent,
  ],
  providers: [EpisodesStore, EpisodesService],
  templateUrl: './root-episodes.component.html',
  styleUrl: './root-episodes.component.scss',
})
export class RootEpisodesComponent {
  private readonly episodesStore = inject(EpisodesStore);
  private readonly globalSearchService = inject(GlobalSearchService);
  private readonly dialog = inject(Dialog);

  readonly isLoading = toSignal(this.episodesStore.isLoading$);
  readonly hasError = toSignal(this.episodesStore.hasError$);
  readonly listItems = toSignal(this.episodesStore.listItems$);

  constructor() {
    toObservable(this.globalSearchService.searchTerm).subscribe(() =>
      this.fetchEpisodes(),
    );
  }

  fetchEpisodes(): void {
    this.episodesStore.getEpisodes$(this.globalSearchService.searchTerm());
  }

  openDetails(episode: Episode): void {
    this.dialog.open(EpisodesDetailsModalComponent, { data: { episode } });
  }
}

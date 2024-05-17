import { Component, OnInit, Signal, inject } from '@angular/core';
import { ListComponent } from '../../../../shared/components/list/list.component';
import { EpisodesStore } from '../../state/episodes.store';
import { EpisodesService } from '../../services/episodes.service';
import { HttpClientModule } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { EpisodeCardComponent } from '../../components/episode-card/episode-card.component';

@Component({
  selector: 'app-root-episodes',
  standalone: true,
  imports: [ListComponent, EpisodeCardComponent],
  providers: [EpisodesStore, EpisodesService, HttpClientModule],
  templateUrl: './root-episodes.component.html',
  styleUrl: './root-episodes.component.scss',
})
export class RootEpisodesComponent implements OnInit {
  private readonly episodesStore = inject(EpisodesStore);

  readonly isLoading = toSignal(this.episodesStore.isLoading$);
  readonly hasError = toSignal(this.episodesStore.hasError$);
  readonly listItems = toSignal(this.episodesStore.listItems$);

  ngOnInit(): void {
    this.episodesStore.getEpisodes$();
  }
}

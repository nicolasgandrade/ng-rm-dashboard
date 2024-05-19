import { Component, input, output } from '@angular/core';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-episode-card',
  standalone: true,
  imports: [],
  templateUrl: './episode-card.component.html',
  styleUrl: './episode-card.component.scss',
})
export class EpisodeCardComponent {
  readonly watchUrl = environment.watchUrl;

  name = input<string>();
  characters = input<string[]>();
  episode = input<string>();

  openDetails = output();
}

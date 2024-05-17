import { Component, input } from '@angular/core';

@Component({
  selector: 'app-episode-card',
  standalone: true,
  imports: [],
  templateUrl: './episode-card.component.html',
  styleUrl: './episode-card.component.scss',
})
export class EpisodeCardComponent {
  name = input<string>();
  characters = input<string[]>();
  episode = input<string>();
}

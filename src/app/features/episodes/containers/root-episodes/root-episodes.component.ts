import { Component } from '@angular/core';
import { ListComponent } from '../../../../shared/components/list/list.component';

@Component({
  selector: 'app-root-episodes',
  standalone: true,
  imports: [ListComponent],
  templateUrl: './root-episodes.component.html',
  styleUrl: './root-episodes.component.scss',
})
export class RootEpisodesComponent {}

import { Component, Input, input } from '@angular/core';
import { LoaderComponent } from '../loader/loader.component';
import { ErrorStateComponent } from '../error-state/error-state.component';
import { EmptyStateComponent } from '../empty-state/empty-state.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [LoaderComponent, ErrorStateComponent, EmptyStateComponent],
  templateUrl: './list.component.html',
})
export class ListComponent {
  @Input() error?: boolean;
  @Input() loading?: boolean;
  @Input() listLength?: number;
}

import { Component, output } from '@angular/core';
import { sidebarConfig } from '../../utils/sidebar-config';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  menuItemClicked = output<string>();

  readonly sidebarConfig = sidebarConfig;
}

import { Component, HostListener, OnInit, output, signal } from '@angular/core';
import { sidebarConfig } from '../../utils/sidebar-config';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit {
  menuItemClicked = output<string>();

  readonly isCollapsed = signal(false);

  readonly sidebarConfig = sidebarConfig;
  private readonly minimumScreenSize = 767;

  ngOnInit(): void {
    this.onResize();
  }

  @HostListener('window:resize')
  onResize() {
    if (window.innerWidth <= this.minimumScreenSize) {
      this.isCollapsed.set(true);
    } else {
      this.isCollapsed.set(false);
    }
  }
}

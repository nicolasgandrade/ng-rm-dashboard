import { Component, inject } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { HeaderComponent } from '../../components/header/header.component';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-root-workspace',
  standalone: true,
  imports: [RouterModule, SidebarComponent, HeaderComponent],
  templateUrl: './root-workspace.component.html',
  styleUrl: './root-workspace.component.scss',
})
export class RootWorkspaceComponent {
  router = inject(Router);

  navigateToFeature(path: string) {
    this.router.navigate(['w', path]);
  }
}

import { Component } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-root-workspace',
  standalone: true,
  imports: [SidebarComponent, HeaderComponent],
  templateUrl: './root-workspace.component.html',
  styleUrl: './root-workspace.component.scss',
})
export class RootWorkspaceComponent {}

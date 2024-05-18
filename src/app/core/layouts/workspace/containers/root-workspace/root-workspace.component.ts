import { Component, OnInit, inject } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { HeaderComponent } from '../../components/header/header.component';
import { Router, RouterModule } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { GlobalSearchService } from '../../../../../shared/services/global-search.service';

@Component({
  selector: 'app-root-workspace',
  standalone: true,
  imports: [
    RouterModule,
    SidebarComponent,
    HeaderComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './root-workspace.component.html',
  styleUrl: './root-workspace.component.scss',
})
export class RootWorkspaceComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly globalSearchService = inject(GlobalSearchService);

  readonly searchControl = new FormControl<string | null>(null);

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((term) => this.globalSearchService.updateSearchTerm(term!));
  }

  navigateToFeature(path: string) {
    this.router.navigate(['w', path]);
  }
}

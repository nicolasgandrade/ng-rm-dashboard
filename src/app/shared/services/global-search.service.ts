import { Injectable, computed, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class GlobalSearchService {
  private readonly _searchTerm = signal('');

  readonly searchTerm = computed(this._searchTerm);

  updateSearchTerm(newTerm: string) {
    this._searchTerm.set(newTerm);
  }
}

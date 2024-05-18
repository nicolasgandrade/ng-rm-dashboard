import { Pipe, PipeTransform } from '@angular/core';
import { Character } from '../models/character.model';

@Pipe({
  standalone: true,
  name: 'status',
})
export class StatusPipe implements PipeTransform {
  transform(status: Character['status']): string {
    switch (status) {
      case 'Dead':
        return 'Morto';
      case 'Alive':
        return 'Vivo';
      default:
        return '-';
    }
  }
}

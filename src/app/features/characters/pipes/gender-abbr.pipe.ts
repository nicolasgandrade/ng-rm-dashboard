import { Pipe, PipeTransform } from '@angular/core';
import { Character } from '../models/character.model';

@Pipe({
  standalone: true,
  name: 'genderAbbr',
})
export class GenderAbbrPipe implements PipeTransform {
  transform(gender: Character['gender']): string {
    switch (gender) {
      case 'Male':
        return 'M';
      case 'Female':
        return 'F';
      case 'Genderless':
        return '-';
      default:
        return '?';
    }
  }
}

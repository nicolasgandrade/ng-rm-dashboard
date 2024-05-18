import { Pipe, PipeTransform } from '@angular/core';
import { Character } from '../models/character.model';

@Pipe({
  standalone: true,
  name: 'gender',
})
export class GenderPipe implements PipeTransform {
  transform(gender: Character['gender']): string {
    switch (gender) {
      case 'Male':
        return 'Masculino';
      case 'Female':
        return 'Feminino';
      case 'Genderless':
        return 'Sem gênero';
      default:
        return 'desconhecido';
    }
  }
}

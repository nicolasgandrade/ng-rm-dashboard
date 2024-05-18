import { Component, input } from '@angular/core';
import { Character } from '../../models/character.model';
import { GenderPipe } from '../../pipes/gender.pipe';

@Component({
  selector: 'app-character-card',
  standalone: true,
  imports: [GenderPipe],
  templateUrl: './character-card.component.html',
  styleUrl: './character-card.component.scss',
})
export class CharacterCardComponent {
  character = input<Character>();
}

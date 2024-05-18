import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, inject } from '@angular/core';
import { Character } from '../../models/character.model';
import { GenderPipe } from '../../pipes/gender.pipe';
import { StatusPipe } from '../../pipes/status.pipe';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';

@Component({
  selector: 'app-character-details-modal',
  standalone: true,
  imports: [GenderPipe, StatusPipe, ModalComponent],
  templateUrl: './character-details-modal.component.html',
})
export class CharacterDetailsModalComponent {
  private readonly dialogRef = inject(DialogRef);

  constructor(@Inject(DIALOG_DATA) public data: { character: Character }) {}

  close() {
    this.dialogRef.close();
  }
}

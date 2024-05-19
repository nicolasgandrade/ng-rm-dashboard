import { Component, Inject, inject } from '@angular/core';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Episode } from '../../models/episode.model';
import { DatePipe } from '@angular/common';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-episodes-details-modal',
  standalone: true,
  imports: [ModalComponent, DatePipe],
  templateUrl: './episodes-details-modal.component.html',
  styleUrl: './episodes-details-modal.component.scss',
})
export class EpisodesDetailsModalComponent {
  private readonly dialogRef = inject(DialogRef);

  readonly watchUrl = environment.watchUrl;

  constructor(@Inject(DIALOG_DATA) public data: { episode: Episode }) {}

  close() {
    this.dialogRef.close();
  }
}

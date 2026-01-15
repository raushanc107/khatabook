import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

import { TranslationService } from '../../../core/services/translation.service';

@Component({
  selector: 'app-transaction-bottom-sheet',
  standalone: true,
  imports: [CommonModule, MatListModule, MatIconModule],
  template: `
    <mat-nav-list>
      <a mat-list-item (click)="openLink('edit')">
        <mat-icon matListItemIcon>edit</mat-icon>
        <span matListItemTitle>{{ translationService.t().dialogs.edit_transaction_title }}</span>
      </a>
      <a mat-list-item (click)="openLink('delete')">
        <mat-icon matListItemIcon color="warn">delete</mat-icon>
        <span matListItemTitle style="color: var(--warn-color)">{{ translationService.t().dialogs.delete_transaction }}</span>
      </a>
    </mat-nav-list>
  `,
  styles: [`
    :host {
        display: block;
        padding-bottom: 0.5rem;
    }
  `]
})
export class TransactionBottomSheetComponent {
  private _bottomSheetRef = inject(MatBottomSheetRef<TransactionBottomSheetComponent>);
  public translationService = inject(TranslationService);

  openLink(action: 'edit' | 'delete'): void {
    this._bottomSheetRef.dismiss(action);
  }
}

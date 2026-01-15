import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslationService } from '../../../core/services/translation.service';

export interface LanguageSelectionDialogData {
  allowCancel?: boolean;
}

@Component({
  selector: 'app-language-selection-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './language-selection-dialog.html',
  styleUrls: ['./language-selection-dialog.scss']
})
export class LanguageSelectionDialogComponent {
  private dialogRef = inject(MatDialogRef<LanguageSelectionDialogComponent>);
  public data = inject<LanguageSelectionDialogData>(MAT_DIALOG_DATA, { optional: true });
  private translationService = inject(TranslationService);

  selectedLang = signal<'en' | 'hi'>(this.translationService.getCurrentLanguage());

  selectLanguage(lang: 'en' | 'hi') {
    this.selectedLang.set(lang);
  }

  confirm() {
    this.translationService.setLanguage(this.selectedLang());
    this.dialogRef.close(true);
  }

  cancel() {
    this.dialogRef.close(false);
  }
}

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslationService } from '../../../core/services/translation.service';
import { ThemeService, Theme } from '../../../core/services/theme.service';

@Component({
  selector: 'app-theme-selection-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './theme-selection-dialog.html',
  styleUrls: ['./theme-selection-dialog.scss']
})
export class ThemeSelectionDialogComponent {
  public translationService = inject(TranslationService);
  public themeService = inject(ThemeService);
  private dialogRef = inject(MatDialogRef<ThemeSelectionDialogComponent>);

  selectTheme(theme: Theme) {
    this.themeService.setTheme(theme);
    this.dialogRef.close();
  }
}

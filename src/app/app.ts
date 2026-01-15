import { Component, signal, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ThemeService } from './core/services/theme.service';
import { TranslationService } from './core/services/translation.service';
import { LanguageSelectionDialogComponent } from './shared/components/language-selection-dialog/language-selection-dialog';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  privatethemeService = inject(ThemeService);
  private translationService = inject(TranslationService);
  private dialog = inject(MatDialog);
  
  protected readonly title = signal('khatabook');

  ngOnInit() {
    if (!this.translationService.isLanguageSet()) {
      this.openLanguageDialog();
    }
  }

  private openLanguageDialog() {
    this.dialog.open(LanguageSelectionDialogComponent, {
      disableClose: true,
      data: { allowCancel: false }
    });
  }
}

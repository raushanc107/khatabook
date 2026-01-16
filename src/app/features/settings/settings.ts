import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ThemeService } from '../../core/services/theme.service';
import { LocalStorageService } from '../../core/services/local-storage.service';
import { TranslationService } from '../../core/services/translation.service';
import { InfoDialogComponent } from '../../shared/components/info-dialog/info-dialog';
import { FactoryResetDialogComponent } from './components/factory-reset-dialog/factory-reset-dialog';
import { LanguageSelectionDialogComponent } from '../../shared/components/language-selection-dialog/language-selection-dialog';
import { ThemeSelectionDialogComponent } from '../../shared/components/theme-selection-dialog/theme-selection-dialog';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatDialogModule
  ],
  templateUrl: './settings.html',
  styleUrls: ['./settings.scss']
})
export class SettingsComponent {
  private router = inject(Router);
  public themeService = inject(ThemeService);
  private localStorageService = inject(LocalStorageService);
  public translationService = inject(TranslationService);
  private dialog = inject(MatDialog);

  version = '1.2.0';

  goBack() {
    this.router.navigate(['/']);
  }

  goToReports() {
    this.router.navigate(['/reports']);
  }

  changeLanguage() {
    this.dialog.open(LanguageSelectionDialogComponent, {
      data: { allowCancel: true }
    });
  }

  openThemeSelection() {
    this.dialog.open(ThemeSelectionDialogComponent, {
        width: '350px',
        panelClass: 'theme-selection-dialog'
    });
  }

  exportData() {
    const data = this.localStorageService.getFullData();
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `khatabook_backup_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    window.URL.revokeObjectURL(url);
  }

  importData(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const data = JSON.parse(content);
        
        if (data.customers || data.transactions) {
          const result = this.localStorageService.importFullData(data);
          
          if (result.addedCustomers === 0 && result.addedTransactions === 0) {
            this.dialog.open(InfoDialogComponent, {
              data: {
                title: this.translationService.t().dialogs.no_new_data_title,
                message: this.translationService.t().dialogs.no_new_data_msg,
                icon: 'info',
                iconColor: 'primary'
              }
            });
          } else {
            const message = this.translationService.t().dialogs.import_success_msg
                .replace('{customers}', result.addedCustomers.toString())
                .replace('{transactions}', result.addedTransactions.toString());
            
            const dialogRef = this.dialog.open(InfoDialogComponent, {
              data: {
                title: this.translationService.t().dialogs.import_success_title,
                message: message,
                icon: 'check_circle',
                iconColor: 'success'
              }
            });
            dialogRef.afterClosed().subscribe(() => window.location.reload());
          }
        } else {
          this.dialog.open(InfoDialogComponent, {
            data: {
              title: this.translationService.t().dialogs.invalid_file_title,
              message: this.translationService.t().dialogs.invalid_file_msg,
              icon: 'error',
              iconColor: 'warn'
            }
          });
        }
      } catch (err) {
        this.dialog.open(InfoDialogComponent, {
          data: {
            title: this.translationService.t().dialogs.error_parsing_title,
            message: this.translationService.t().dialogs.error_parsing_msg,
            icon: 'error',
            iconColor: 'warn'
          }
        });
      }
    };

    reader.readAsText(file);
    input.value = '';
  }

  factoryReset() {
    const dialogRef = this.dialog.open(FactoryResetDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'reset') {
        this.localStorageService.clearData();
        window.location.reload();
      }
    });
  }
}

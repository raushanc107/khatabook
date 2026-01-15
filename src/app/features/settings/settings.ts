import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ThemeService } from '../../core/services/theme.service';
import { LocalStorageService } from '../../core/services/local-storage.service';
import { InfoDialogComponent } from '../../shared/components/info-dialog/info-dialog';

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
  private dialog = inject(MatDialog);

  version = '1.2.0';

  goBack() {
    this.router.navigate(['/']);
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
                title: 'No New Data',
                message: 'All items in the backup already exist in your current data.',
                icon: 'info',
                iconColor: 'primary'
              }
            });
          } else {
            const dialogRef = this.dialog.open(InfoDialogComponent, {
              data: {
                title: 'Import Successful!',
                message: `Added:\n• ${result.addedCustomers} new customer(s)\n• ${result.addedTransactions} new transaction(s)\n\nThe application will now reload to apply changes.`,
                icon: 'check_circle',
                iconColor: 'success'
              }
            });
            dialogRef.afterClosed().subscribe(() => window.location.reload());
          }
        } else {
          this.dialog.open(InfoDialogComponent, {
            data: {
              title: 'Invalid File',
              message: 'The selected file is not a valid Khatabook backup.',
              icon: 'error',
              iconColor: 'warn'
            }
          });
        }
      } catch (err) {
        this.dialog.open(InfoDialogComponent, {
          data: {
            title: 'Error',
            message: 'Failed to parse the backup file.',
            icon: 'error',
            iconColor: 'warn'
          }
        });
      }
    };

    reader.readAsText(file);
    input.value = '';
  }
}

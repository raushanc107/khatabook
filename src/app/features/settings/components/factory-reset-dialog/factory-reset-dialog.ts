import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LocalStorageService } from '../../../../core/services/local-storage.service';

@Component({
  selector: 'app-factory-reset-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './factory-reset-dialog.html',
  styleUrls: ['./factory-reset-dialog.scss']
})
export class FactoryResetDialogComponent {
  private dialogRef = inject(MatDialogRef<FactoryResetDialogComponent>);
  private localStorageService = inject(LocalStorageService);

  onCancel(): void {
    this.dialogRef.close();
  }

  onBackup(): void {
    // Logic to export data
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

  onReset(): void {
    this.dialogRef.close('reset');
  }
}

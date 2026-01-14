import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export interface InfoDialogData {
    title: string;
    message: string;
    icon?: string;
    iconColor?: 'primary' | 'warn' | 'accent' | 'success';
    buttonText?: string;
}

@Component({
  selector: 'app-info-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  template: `
    <div class="dialog-header">
      <mat-icon *ngIf="data.icon" [class]="'icon-' + (data.iconColor || 'primary')">{{ data.icon }}</mat-icon>
      <h2 mat-dialog-title>{{ data.title }}</h2>
    </div>
    <mat-dialog-content>
      <p [innerHTML]="data.message"></p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-raised-button color="primary" (click)="onClose()">{{ data.buttonText || 'OK' }}</button>
    </mat-dialog-actions>
  `,
  styles: [`
    .dialog-header {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 0.5rem;
      padding: 1.25rem 1.5rem 0;
    }
    
    h2 {
      margin: 0;
    }
    
    mat-icon {
      font-size: 32px;
      width: 32px;
      height: 32px;
    }
    
    .icon-primary { color: var(--primary-color); }
    .icon-warn { color: var(--error-color); }
    .icon-accent { color: var(--accent-color); }
    .icon-success { color: var(--success-color); }
    
    mat-dialog-content { 
      padding-top: 1rem !important; 
      min-width: 300px;
      max-width: 400px;
    }
    
    p { 
      margin: 0; 
      color: var(--text-secondary);
      line-height: 1.6;
      white-space: pre-line;
    }
  `]
})
export class InfoDialogComponent {
  readonly dialogRef = inject(MatDialogRef<InfoDialogComponent>);
  readonly data = inject<InfoDialogData>(MAT_DIALOG_DATA);

  onClose(): void {
    this.dialogRef.close();
  }
}

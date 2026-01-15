import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { TranslationService } from '../../../core/services/translation.service';

@Component({
  selector: 'app-add-customer-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule],
  template: `
    <h2 mat-dialog-title>{{ injectedData?.id ? translationService.t().dialogs.edit_customer_title : translationService.t().dialogs.add_customer_title }}</h2>
    <mat-dialog-content>
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>{{ translationService.t().dialogs.customer_name }}</mat-label>
        <input matInput [(ngModel)]="data.name" [placeholder]="translationService.t().dialogs.customer_name_placeholder" required>
      </mat-form-field>
      
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>{{ translationService.t().dialogs.phone_number }}</mat-label>
        <input matInput [(ngModel)]="data.phoneNumber" [placeholder]="translationService.t().dialogs.phone_number_placeholder">
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">{{ translationService.t().common.cancel }}</button>
      <button mat-raised-button color="primary" (click)="onSave()" [disabled]="!data.name">{{ translationService.t().common.save }}</button>
    </mat-dialog-actions>
  `,
  styles: [`
    .full-width { width: 100%; margin-bottom: 0.5rem; }
    mat-dialog-content { padding-top: 1rem !important; }
  `]
})
export class AddCustomerDialogComponent {
  public translationService = inject(TranslationService);
  readonly dialogRef = inject(MatDialogRef<AddCustomerDialogComponent>);
  readonly injectedData = inject<{name: string, phoneNumber: string, id?: string} | null>(MAT_DIALOG_DATA, { optional: true });
  
  data = {
    name: this.injectedData?.name || '',
    phoneNumber: this.injectedData?.phoneNumber || ''
  };

  onCancel(): void {
    this.dialogRef.close();
  }
  
  onSave(): void {
      this.dialogRef.close(this.data);
  }
}

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-customer-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule],
  template: `
    <h2 mat-dialog-title>{{ injectedData?.id ? 'Edit' : 'Add New' }} Customer</h2>
    <mat-dialog-content>
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Customer Name</mat-label>
        <input matInput [(ngModel)]="data.name" placeholder="Ex. John Doe" required>
      </mat-form-field>
      
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Phone Number (Optional)</mat-label>
        <input matInput [(ngModel)]="data.phoneNumber" placeholder="Ex. 9876543210">
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Cancel</button>
      <button mat-raised-button color="primary" (click)="onSave()" [disabled]="!data.name">Save</button>
    </mat-dialog-actions>
  `,
  styles: [`
    .full-width { width: 100%; margin-bottom: 0.5rem; }
    mat-dialog-content { padding-top: 1rem !important; }
  `]
})
export class AddCustomerDialogComponent {
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

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { TranslationService } from '../../../core/services/translation.service';

@Component({
  selector: 'app-add-transaction-dialog',
  standalone: true,
  imports: [
      CommonModule, 
      MatDialogModule, 
      MatButtonModule, 
      MatFormFieldModule, 
      MatInputModule, 
      MatDatepickerModule,
      MatNativeDateModule,
      FormsModule
  ],
  template: `
    <h2 mat-dialog-title>{{ data.id ? translationService.t().dialogs.edit_transaction_title : translationService.t().dialogs.add_transaction_title }} ({{ data.type === 'GAVE' ? translationService.t().dialogs.you_gave : translationService.t().dialogs.you_got }})</h2>
    <mat-dialog-content>
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>{{ translationService.t().dialogs.amount }}</mat-label>
        <span matPrefix>₹ &nbsp;</span>
        <input matInput type="number" [(ngModel)]="formData.amount" placeholder="0.00" autoFocus required>
      </mat-form-field>

      <div class="row">
          <mat-form-field appearance="outline" class="half-width">
            <mat-label>{{ translationService.t().dialogs.date }}</mat-label>
            <input matInput [matDatepicker]="picker" [(ngModel)]="formData.date">
            <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
            <mat-datepicker #picker></mat-datepicker>
          </mat-form-field>

          <mat-form-field appearance="outline" class="half-width">
            <mat-label>{{ translationService.t().dialogs.time }}</mat-label>
            <input matInput type="time" [(ngModel)]="formData.time">
          </mat-form-field>
      </div>
      
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>{{ translationService.t().dialogs.note }}</mat-label>
        <input matInput [(ngModel)]="formData.note" [placeholder]="translationService.t().dialogs.note_placeholder">
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">{{ translationService.t().common.cancel }}</button>
      <button mat-raised-button [color]="data.type === 'GAVE' ? 'warn' : 'primary'" (click)="onSave()" [disabled]="!formData.amount">{{ translationService.t().common.save }}</button>
    </mat-dialog-actions>
  `,
  styles: [`
    .full-width { width: 100%; margin-bottom: 0.5rem; }
    .half-width { width: 48%; margin-bottom: 0.5rem; }
    .row { display: flex; justify-content: space-between; gap: 4%; }
    mat-dialog-content { padding-top: 1rem !important; }
    [matPrefix] { margin-right: 8px; margin-left: 4px; font-weight: 500; font-size: 1.1rem; }
  `]
})
export class AddTransactionDialogComponent {
  public translationService = inject(TranslationService);
  readonly dialogRef = inject(MatDialogRef<AddTransactionDialogComponent>);
  readonly data = inject<{ type: 'GAVE' | 'GOT', id?: string, amount?: number, date?: string, note?: string }>(MAT_DIALOG_DATA);
  
  // Initialize with passed date or current date
  private initialDate = this.data.date ? new Date(this.data.date) : new Date();

  formData = {
    amount: this.data.amount || null,
    date: this.initialDate,
    time: this.toTimeString(this.initialDate),
    note: this.data.note || ''
  };

  private toTimeString(date: Date): string {
      const h = date.getHours().toString().padStart(2, '0');
      const m = date.getMinutes().toString().padStart(2, '0');
      return `${h}:${m}`;
  }

  onCancel(): void {
    this.dialogRef.close();
  }
  
  onSave(): void {
      // Combine Date and Time
      const datePart = this.formData.date;
      const timePart = this.formData.time || '00:00';
      
      const combinedDate = new Date(datePart);
      const [hours, minutes] = timePart.split(':').map(Number);
      combinedDate.setHours(hours);
      combinedDate.setMinutes(minutes);

      this.dialogRef.close({
          amount: this.formData.amount,
          date: combinedDate.toISOString(), // ISO String return
          note: this.formData.note
      });
  }
}

import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddCustomerDialogComponent } from '../../shared/components/add-customer-dialog/add-customer-dialog';
import { Customer } from '../../core/models/customer.model';
import * as KhatabookActions from '../../store/khatabook.actions';
import * as KhatabookSelectors from '../../store/khatabook.selectors';
import { Router } from '@angular/router';

import { TranslationService } from '../../core/services/translation.service';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [CommonModule, MatDialogModule, ReactiveFormsModule],
  templateUrl: './customer-list.html',
  styleUrls: ['./customer-list.scss']
})
export class CustomerListComponent implements OnInit {
  private store = inject(Store);
  private dialog = inject(MatDialog);
  public router = inject(Router);
  public translationService = inject(TranslationService);
  
  searchControl = new FormControl('');
  
  customers$ = combineLatest([
    this.store.select(KhatabookSelectors.selectAllCustomersWithBalance),
    this.searchControl.valueChanges.pipe(startWith(''))
  ]).pipe(
    map(([customers, searchTerm]) => {
      const term = (searchTerm || '').toLowerCase();
      return customers
        .filter(c => c.name.toLowerCase().includes(term) || c.phoneNumber.includes(term))
        .sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime());
    })
  );
  
  totalToGet$ = this.store.select(KhatabookSelectors.selectTotalToGet);
  totalToGive$ = this.store.select(KhatabookSelectors.selectTotalToGive);
  netBalance$ = this.store.select(KhatabookSelectors.selectNetBalance);

  ngOnInit() {
    this.store.dispatch(KhatabookActions.loadCustomers());
    this.store.dispatch(KhatabookActions.loadTransactions());
  }

  addCustomer() {
      const dialogRef = this.dialog.open(AddCustomerDialogComponent, {
          width: '300px'
      });

      dialogRef.afterClosed().subscribe(result => {
          if (result && result.name) {
               const newCustomer: Customer = {
                   id: crypto.randomUUID(),
                   name: result.name,
                   phoneNumber: result.phoneNumber || '',
                   currentBalance: 0,
                   lastUpdated: new Date().toISOString()
               };
               this.store.dispatch(KhatabookActions.addCustomer({ customer: newCustomer }));
          }
      });
  }

  viewCustomer(id: string) {
      this.router.navigate(['customer', id]);
  }
}

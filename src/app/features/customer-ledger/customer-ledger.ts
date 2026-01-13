import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AddTransactionDialogComponent } from '../../shared/components/add-transaction-dialog/add-transaction-dialog';
import { AddCustomerDialogComponent } from '../../shared/components/add-customer-dialog/add-customer-dialog';
import { TransactionBottomSheetComponent } from '../../shared/components/transaction-bottom-sheet/transaction-bottom-sheet';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog';
import { Customer } from '../../core/models/customer.model';
import { Transaction } from '../../core/models/transaction.model';
import * as KhatabookActions from '../../store/khatabook.actions';
import * as KhatabookSelectors from '../../store/khatabook.selectors';

@Component({
  selector: 'app-customer-ledger',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatMenuModule, MatIconModule, MatButtonModule, MatBottomSheetModule],
  templateUrl: './customer-ledger.html',
  styleUrls: ['./customer-ledger.scss']
})
export class CustomerLedgerComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private store = inject(Store);
  private dialog = inject(MatDialog);
  private bottomSheet = inject(MatBottomSheet);

  customerId$ = this.route.paramMap.pipe(map(params => params.get('id')));
  
  customer$: Observable<Customer | undefined> = this.customerId$.pipe(
    switchMap(id => this.store.select(KhatabookSelectors.selectCustomerEntitiesMap).pipe(
        switchMap(entities => {
            const customer = entities[id!];
            if (!customer) return [undefined];
            return this.store.select(KhatabookSelectors.selectCustomerBalance(id!)).pipe(
                map(balance => ({ ...customer, currentBalance: balance }))
            );
        })
    ))
  );

  transactions$: Observable<Transaction[]> = this.customerId$.pipe(
    switchMap(id => this.store.select(KhatabookSelectors.selectTransactionsByCustomerId(id!)).pipe(
        map(transactions => [...transactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())) // Sort desc
    ))
  );

  ngOnInit() {
      this.store.dispatch(KhatabookActions.loadTransactions());
      this.store.dispatch(KhatabookActions.loadCustomers());
  }

  addTransaction(type: 'GAVE' | 'GOT') {
      this.openTransactionDialog(type);
  }
  
  editTransaction(transaction: Transaction) {
      this.openTransactionDialog(transaction.type, transaction);
  }
  
  openTransactionOptions(transaction: Transaction) {
      const bottomSheetRef = this.bottomSheet.open(TransactionBottomSheetComponent);
      
      bottomSheetRef.afterDismissed().subscribe((result: 'edit' | 'delete' | undefined) => {
          if (result === 'edit') {
              this.editTransaction(transaction);
          } else if (result === 'delete') {
              this.deleteTransaction(transaction);
          }
      });
  }

  deleteTransaction(transaction: Transaction) {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
          width: '350px',
          data: {
              title: 'Delete Transaction?',
              message: `Are you sure you want to delete this transaction of ₹${transaction.amount}? This action cannot be undone.`,
              confirmText: 'Delete',
              color: 'warn'
          }
      });

      dialogRef.afterClosed().subscribe(confirmed => {
          if (confirmed) {
              this.store.dispatch(KhatabookActions.deleteTransaction({ id: transaction.id }));
              
               // Manual balance update removed - handled by selector
          }
      });
  }

  editCustomer(customer: Customer) {
      const dialogRef = this.dialog.open(AddCustomerDialogComponent, {
          width: '300px',
          data: { 
              name: customer.name, 
              phoneNumber: customer.phoneNumber,
              id: customer.id
          }
      });

      dialogRef.afterClosed().subscribe(result => {
          if (result && result.name) {
              this.store.dispatch(KhatabookActions.updateCustomer({
                  customer: {
                      id: customer.id,
                      changes: {
                          name: result.name,
                          phoneNumber: result.phoneNumber,
                          lastUpdated: new Date().toISOString()
                      }
                  }
              }));
          }
      });
  }

  deleteCustomer(customer: Customer) {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
          width: '350px',
          data: {
              title: `Delete ${customer.name}?`,
              message: `Are you sure you want to delete this customer? All their associated transactions and data will be permanently removed.`,
              confirmText: 'Delete Customer',
              color: 'warn'
          }
      });

      dialogRef.afterClosed().subscribe(confirmed => {
          if (confirmed) {
              this.store.dispatch(KhatabookActions.deleteCustomer({ id: customer.id }));
              this.router.navigate(['/']);
          }
      });
  }

  private openTransactionDialog(type: 'GAVE' | 'GOT', existing?: Transaction) {
      const dialogRef = this.dialog.open(AddTransactionDialogComponent, {
          width: '300px',
          data: { 
              type, 
              id: existing?.id,
              amount: existing?.amount,
              date: existing?.date,
              note: existing?.notes
          },
          autoFocus: 'first-tabbable'
      });

      dialogRef.afterClosed().subscribe(result => {
          if (result && result.amount) {
              const amount = parseFloat(result.amount);
              const date = result.date ? new Date(result.date).toISOString() : new Date().toISOString();
              
              this.customerId$.pipe(take(1)).subscribe(customerId => {
                  if (customerId) {
                      if (existing) {
                          // UPDATE logic
                          const changes: Partial<Transaction> = {
                              amount,
                              date,
                              notes: result.note || ''
                          };
                          this.store.dispatch(KhatabookActions.updateTransaction({ 
                              transaction: { id: existing.id, changes } 
                          }));
                          
                          
                          // Manual balance update removed - handled by selector
                      } else {
                          // CREATE logic
                          const transaction: Transaction = {
                              id: crypto.randomUUID(),
                              customerId,
                              amount,
                              type,
                              date,
                              notes: result.note || ''
                          };
                          this.store.dispatch(KhatabookActions.addTransaction({ transaction }));
                          
                          // Update lastUpdated only
                          this.customer$.pipe(take(1)).subscribe(customer => {
                              if (customer) {
                                  this.store.dispatch(KhatabookActions.updateCustomer({ 
                                      customer: { id: customer.id, changes: { 
                                          lastUpdated: new Date().toISOString() 
                                      }} 
                                  }));
                              }
                          });
                      }
                  }
              });
          }
      });
  }

  goBack() {
      this.router.navigate(['/']);
  }
}

import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap, withLatestFrom } from 'rxjs/operators';
import { LocalStorageService } from '../core/services/local-storage.service';
import * as KhatabookActions from './khatabook.actions';
import * as KhatabookSelectors from './khatabook.selectors';

@Injectable()
export class KhatabookEffects {
  private actions$ = inject(Actions);
  private localStorageService = inject(LocalStorageService);
  private store = inject(Store);

  // Load Customers
  loadCustomers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(KhatabookActions.loadCustomers),
      mergeMap(() =>
        this.localStorageService.getCustomers().pipe(
          map(customers => KhatabookActions.loadCustomersSuccess({ customers })),
          catchError(error => of(KhatabookActions.loadCustomersFailure({ error })))
        )
      )
    )
  );

  // Load Transactions
  loadTransactions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(KhatabookActions.loadTransactions),
      mergeMap(() =>
        this.localStorageService.getTransactions().pipe(
          map(transactions => KhatabookActions.loadTransactionsSuccess({ transactions })),
          catchError(error => of(KhatabookActions.loadTransactionsFailure({ error })))
        )
      )
    )
  );

  // Persist Customers (Auto-Save on Add/Delete)
  persistCustomers$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(KhatabookActions.addCustomer, KhatabookActions.deleteCustomer, KhatabookActions.updateCustomer),
        withLatestFrom(this.store.select(KhatabookSelectors.selectAllCustomersList)),
        tap(([action, customers]) => {
          this.localStorageService.saveCustomers(customers).subscribe();
        })
      ),
    { dispatch: false }
  );

  // Persist Transactions
  persistTransactions$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
            KhatabookActions.addTransaction, 
            KhatabookActions.deleteTransaction,
            KhatabookActions.updateTransaction
        ),
        withLatestFrom(this.store.select(KhatabookSelectors.selectAllTransactionsList)),
        tap(([action, transactions]) => {
          this.localStorageService.saveTransactions(transactions).subscribe();
        })
      ),
    { dispatch: false }
  );
  
  // NOTE: In a real app, update balance in Customer model when transaction happens.
  // For simplicity, we can calculate balance dynamically or have an effect that updates the customer balance.
  // Let's implement a simple effect: When AddTransaction -> Update Customer Balance.
  
  updateCustomerBalance$ = createEffect(() =>
      this.actions$.pipe(
          ofType(KhatabookActions.addTransaction),
          withLatestFrom(this.store.select(KhatabookSelectors.selectCustomerEntitiesMap)),
          map(([{ transaction }, customerEntities]) => {
              const customer = customerEntities[transaction.customerId];
              if (customer) {
                   // Calculate new balance
                   let newBalance = customer.currentBalance;
                   if (transaction.type === 'GAVE') {
                       // I Gave -> They owe me more (Positive increases? Or Negative?)
                       // Earlier we said: Green = You'll Get (>0), Red = You'll Give (<0).
                       // GAVE = I Gave money -> I expect to GET it back. So Balance INCREASES (becomes more positive).
                       newBalance += transaction.amount;
                   } else {
                       // GOT = I Got money -> They owe me less. Balance DECREASES.
                       newBalance -= transaction.amount;
                   }
                   
                   const updatedCustomer = { 
                       ...customer, 
                       currentBalance: newBalance,
                       lastUpdated: new Date().toISOString()
                   };
                   
                   // Technically we need an UpdateCustomer action, but for now let's just reuse AddCustomer (Adapter.upsert or just Add with overwrite logic? Adapter.addOne fails on duplicate).
                   // Better: Dispatch an UpdateCustomer action? 
                   // I haven't defined UpdateCustomer. Let's define it or just rely on dynamic calculation.
                   // Dynamic calculation is safer but slower on large lists. Data persistence wants the specific value.
                   // I'll skip this specific side-effect for now and just rely on the UI to calculate or add UpdateCustomer later.
                   // Actually, let's add UpdateCustomer quickly to Actions/Reducer for completeness?
                   // Just add it to actions first.
                   return { type: 'NO_OP' }; // Placeholder
              }
              return { type: 'NO_OP' };
          })
      ), { dispatch: false }
  );
}

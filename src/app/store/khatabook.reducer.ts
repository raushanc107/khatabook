import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Customer } from '../core/models/customer.model';
import { Transaction } from '../core/models/transaction.model';
import * as KhatabookActions from './khatabook.actions';

// 1. State Interfaces
export interface CustomerState extends EntityState<Customer> {
  loaded: boolean;
}

export interface TransactionState extends EntityState<Transaction> {
  loaded: boolean;
}

// 2. Adapters
export const customerAdapter: EntityAdapter<Customer> = createEntityAdapter<Customer>();
export const transactionAdapter: EntityAdapter<Transaction> = createEntityAdapter<Transaction>();

// 3. Initial States
export const initialCustomerState: CustomerState = customerAdapter.getInitialState({
  loaded: false
});

export const initialTransactionState: TransactionState = transactionAdapter.getInitialState({
  loaded: false
});

// 4. Reducers
export const customerReducer = createReducer(
  initialCustomerState,
  on(KhatabookActions.loadCustomersSuccess, (state, { customers }) => {
    return customerAdapter.setAll(customers, { ...state, loaded: true });
  }),
  on(KhatabookActions.addCustomer, (state, { customer }) => {
    return customerAdapter.addOne(customer, state);
  }),
  on(KhatabookActions.updateCustomer, (state, { customer }) => {
    return customerAdapter.updateOne(customer, state);
  }),
  on(KhatabookActions.deleteCustomer, (state, { id }) => {
    return customerAdapter.removeOne(id, state);
  })
);

export const transactionReducer = createReducer(
  initialTransactionState,
  on(KhatabookActions.loadTransactionsSuccess, (state, { transactions }) =>
    transactionAdapter.setAll(transactions, state)
  ),
  on(KhatabookActions.addTransaction, (state, { transaction }) =>
    transactionAdapter.addOne(transaction, state)
  ),
  on(KhatabookActions.updateTransaction, (state, { transaction }) =>
    transactionAdapter.updateOne(transaction, state)
  ),
  on(KhatabookActions.deleteTransaction, (state, { id }) =>
    transactionAdapter.removeOne(id, state)
  )
);

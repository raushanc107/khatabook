import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Customer } from '../core/models/customer.model';
import { Transaction } from '../core/models/transaction.model';

// Customers
export const loadCustomers = createAction('[Customer] Load Customers');
export const loadCustomersSuccess = createAction('[Customer] Load Customers Success', props<{ customers: Customer[] }>());
export const loadCustomersFailure = createAction('[Customer] Load Customers Failure', props<{ error: any }>());

export const addCustomer = createAction('[Customer] Add Customer', props<{ customer: Customer }>());
export const updateCustomer = createAction('[Customer] Update Customer', props<{ customer: Update<Customer> }>());
export const deleteCustomer = createAction('[Customer] Delete Customer', props<{ id: string }>());

// Transactions
export const loadTransactions = createAction('[Transaction] Load Transactions');
export const loadTransactionsSuccess = createAction('[Transaction] Load Transactions Success', props<{ transactions: Transaction[] }>());
export const loadTransactionsFailure = createAction('[Transaction] Load Transactions Failure', props<{ error: any }>());

export const addTransaction = createAction('[Transaction] Add Transaction', props<{ transaction: Transaction }>());
export const updateTransaction = createAction('[Transaction] Update Transaction', props<{ transaction: Update<Transaction> }>());
export const deleteTransaction = createAction('[Transaction] Delete Transaction', props<{ id: string }>());

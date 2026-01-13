import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CustomerState, TransactionState, customerAdapter, transactionAdapter } from './khatabook.reducer';
import { Transaction } from '../core/models/transaction.model';

export const selectCustomerState = createFeatureSelector<CustomerState>('customers');
export const selectTransactionState = createFeatureSelector<TransactionState>('transactions');

// Customer Selectors
const {
  selectIds: selectCustomerIds,
  selectEntities: selectCustomerEntities,
  selectAll: selectAllCustomers,
  selectTotal: selectCustomerTotal,
} = customerAdapter.getSelectors(selectCustomerState);

export const selectAllCustomersList = selectAllCustomers;
export const selectCustomerEntitiesMap = selectCustomerEntities;

// Transaction Selectors
const {
  selectAll: selectAllTransactions,
} = transactionAdapter.getSelectors(selectTransactionState);

export const selectAllTransactionsList = selectAllTransactions;

// Derived Selectors
export const selectTransactionsByCustomerId = (customerId: string) =>
  createSelector(selectAllTransactions, (transactions: Transaction[]) =>
    transactions.filter(t => t.customerId === customerId).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  );

// Calculate balance dynamically from transactions
export const selectCustomerBalance = (customerId: string) =>
  createSelector(selectAllTransactions, (transactions: Transaction[]) => {
    return transactions
      .filter(t => t.customerId === customerId)
      .reduce((acc, t) => {
        return t.type === 'GAVE' ? acc + t.amount : acc - t.amount;
      }, 0);
  });

// Select all customers with their dynamically calculated balance
export const selectAllCustomersWithBalance = createSelector(
  selectAllCustomers,
  selectAllTransactions,
  (customers, transactions) => {
    return customers.map(customer => {
      const balance = transactions
        .filter(t => t.customerId === customer.id)
        .reduce((acc, t) => {
           return t.type === 'GAVE' ? acc + t.amount : acc - t.amount;
        }, 0);
      
      return { ...customer, currentBalance: balance }; // Override stored balance with calculated one
    });
  }
);

export const selectTotalToGet = createSelector(
  selectAllCustomersWithBalance,
  (customers) => customers.filter(c => c.currentBalance > 0).reduce((acc, c) => acc + c.currentBalance, 0)
);

export const selectTotalToGive = createSelector(
  selectAllCustomersWithBalance,
  (customers) => customers.filter(c => c.currentBalance < 0).reduce((acc, c) => acc + Math.abs(c.currentBalance), 0)
);

export const selectNetBalance = createSelector(
  selectTotalToGet,
  selectTotalToGive,
  (toGet, toGive) => toGet - toGive
);

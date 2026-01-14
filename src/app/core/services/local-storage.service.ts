import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Customer } from '../models/customer.model';
import { Transaction } from '../models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private readonly CUSTOMER_KEY = 'khatabook_customers';
  private readonly TRANSACTION_KEY = 'khatabook_transactions';

  constructor() {}

  // Customers
  getCustomers(): Observable<Customer[]> {
    const data = localStorage.getItem(this.CUSTOMER_KEY);
    const customers = data ? JSON.parse(data) : [];
    return of(customers).pipe(delay(300));
  }

  saveCustomers(customers: Customer[]): Observable<boolean> {
    localStorage.setItem(this.CUSTOMER_KEY, JSON.stringify(customers));
    return of(true).pipe(delay(200));
  }

  // Transactions
  getTransactions(): Observable<Transaction[]> {
    const data = localStorage.getItem(this.TRANSACTION_KEY);
    const transactions = data ? JSON.parse(data) : [];
    return of(transactions).pipe(delay(300));
  }

  saveTransactions(transactions: Transaction[]): Observable<boolean> {
    localStorage.setItem(this.TRANSACTION_KEY, JSON.stringify(transactions));
    return of(true).pipe(delay(200));
  }
  
  // Clear Data (Testing)
  clearData(): void {
    localStorage.removeItem(this.CUSTOMER_KEY);
    localStorage.removeItem(this.TRANSACTION_KEY);
  }

  // Full Data Import/Export
  getFullData(): { customers: Customer[], transactions: Transaction[] } {
    const customersJson = localStorage.getItem(this.CUSTOMER_KEY);
    const transactionsJson = localStorage.getItem(this.TRANSACTION_KEY);
    
    return {
      customers: customersJson ? JSON.parse(customersJson) : [],
      transactions: transactionsJson ? JSON.parse(transactionsJson) : []
    };
  }

  importFullData(data: { customers: Customer[], transactions: Transaction[] }): { addedCustomers: number, addedTransactions: number } {
    let addedCustomers = 0;
    let addedTransactions = 0;

    // Get existing data
    const existingData = this.getFullData();
    
    // Merge customers - only add ones with IDs that don't exist
    if (data.customers && Array.isArray(data.customers)) {
      const existingCustomerIds = new Set(existingData.customers.map(c => c.id));
      const newCustomers = data.customers.filter(c => !existingCustomerIds.has(c.id));
      
      if (newCustomers.length > 0) {
        const mergedCustomers = [...existingData.customers, ...newCustomers];
        localStorage.setItem(this.CUSTOMER_KEY, JSON.stringify(mergedCustomers));
        addedCustomers = newCustomers.length;
      }
    }
    
    // Merge transactions - only add ones with IDs that don't exist
    if (data.transactions && Array.isArray(data.transactions)) {
      const existingTransactionIds = new Set(existingData.transactions.map(t => t.id));
      const newTransactions = data.transactions.filter(t => !existingTransactionIds.has(t.id));
      
      if (newTransactions.length > 0) {
        const mergedTransactions = [...existingData.transactions, ...newTransactions];
        localStorage.setItem(this.TRANSACTION_KEY, JSON.stringify(mergedTransactions));
        addedTransactions = newTransactions.length;
      }
    }

    return { addedCustomers, addedTransactions };
  }
}

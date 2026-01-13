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
}

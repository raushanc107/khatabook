export type TransactionType = 'GAVE' | 'GOT';

export interface Transaction {
  id: string;
  customerId: string;
  amount: number;
  type: TransactionType;
  date: string; // ISO Date string
  notes?: string;
}

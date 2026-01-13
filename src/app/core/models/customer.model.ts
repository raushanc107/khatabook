export interface Customer {
  id: string;
  name: string;
  phoneNumber: string;
  currentBalance: number; // > 0: You'll Get (Green), < 0: You'll Give (Red)
  lastUpdated: string; // ISO Date string
}

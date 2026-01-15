import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard';

export const routes: Routes = [
  { 
    path: '', 
    component: DashboardComponent,
    children: [
        { path: 'customer/:id', loadComponent: () => import('./features/customer-ledger/customer-ledger').then(m => m.CustomerLedgerComponent) }
    ]
  },
  { 
    path: 'reports', 
    loadComponent: () => import('./features/reports/reports').then(m => m.ReportsComponent)
  },
  {
    path: 'settings',
    loadComponent: () => import('./features/settings/settings').then(m => m.SettingsComponent)
  }
];

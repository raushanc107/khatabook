import { Component, inject, computed, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import * as KhatabookSelectors from '../../store/khatabook.selectors';
import * as KhatabookActions from '../../store/khatabook.actions';

type DateRange = '7days' | '30days' | 'all';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [
    CommonModule, 
    BaseChartDirective, 
    MatButtonModule, 
    MatIconModule, 
    MatTabsModule,
    MatButtonToggleModule
  ],
  templateUrl: './reports.html',
  styleUrls: ['./reports.scss']
})
export class ReportsComponent implements OnInit {
  private router = inject(Router);
  private store = inject(Store);

  // Data from store
  customers = this.store.selectSignal(KhatabookSelectors.selectAllCustomersWithBalance);
  transactions = this.store.selectSignal(KhatabookSelectors.selectAllTransactionsList);

  ngOnInit() {
    // Ensure data is loaded
    this.store.dispatch(KhatabookActions.loadCustomers());
    this.store.dispatch(KhatabookActions.loadTransactions());
  }

  // Date range filter
  dateRange = signal<DateRange>('30days');

  // Filtered transactions based on date range
  filteredTransactions = computed(() => {
    const range = this.dateRange();
    const now = new Date();
    const allTransactions = this.transactions();

    if (range === 'all') return allTransactions;

    const daysAgo = range === '7days' ? 7 : 30;
    const cutoffDate = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);

    return allTransactions.filter(t => new Date(t.date) >= cutoffDate);
  });

  // Financial Metrics
  totalOutstanding = computed(() => {
    return this.customers().reduce((sum, c) => sum + c.currentBalance, 0);
  });

  totalCreditGiven = computed(() => {
    return this.customers()
      .filter(c => c.currentBalance > 0)
      .reduce((sum, c) => sum + c.currentBalance, 0);
  });

  totalDebtOwed = computed(() => {
    return Math.abs(
      this.customers()
        .filter(c => c.currentBalance < 0)
        .reduce((sum, c) => sum + c.currentBalance, 0)
    );
  });

  totalTransactions = computed(() => this.filteredTransactions().length);

  activeCustomers = computed(() => {
    return this.customers().filter(c => c.currentBalance !== 0).length;
  });

  // Top customers by balance
  topCustomers = computed(() => {
    return [...this.customers()]
      .sort((a, b) => Math.abs(b.currentBalance) - Math.abs(a.currentBalance))
      .slice(0, 10);
  });

  // Customer distribution
  customerDistribution = computed(() => {
    const creditors = this.customers().filter(c => c.currentBalance > 0).length;
    const debtors = this.customers().filter(c => c.currentBalance < 0).length;
    return { creditors, debtors };
  });

  // Cash flow data (Gave vs Got over time)
  cashFlowChartData = computed<ChartData<'line'>>(() => {
    const transactions = this.filteredTransactions();
    const dateMap = new Map<string, { gave: number; got: number }>();

    transactions.forEach(t => {
      const date = new Date(t.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      if (!dateMap.has(date)) {
        dateMap.set(date, { gave: 0, got: 0 });
      }
      const entry = dateMap.get(date)!;
      if (t.type === 'GAVE') {
        entry.gave += t.amount;
      } else {
        entry.got += t.amount;
      }
    });

    const labels = Array.from(dateMap.keys());
    const gaveData = labels.map(label => dateMap.get(label)!.gave);
    const gotData = labels.map(label => dateMap.get(label)!.got);

    return {
      labels,
      datasets: [
        {
          label: 'You Gave',
          data: gaveData,
          borderColor: '#ef4444',
          backgroundColor: 'rgba(239, 68, 68, 0.15)',
          fill: true,
          tension: 0.45,
          pointRadius: 4,
          pointBackgroundColor: '#ef4444',
          pointBorderColor: '#fff',
          pointHoverRadius: 6
        },
        {
          label: 'You Got',
          data: gotData,
          borderColor: '#10b981',
          backgroundColor: 'rgba(16, 185, 129, 0.15)',
          fill: true,
          tension: 0.45,
          pointRadius: 4,
          pointBackgroundColor: '#10b981',
          pointBorderColor: '#fff',
          pointHoverRadius: 6
        }
      ]
    };
  });

  // Top customers chart data
  topCustomersChartData = computed<ChartData<'bar'>>(() => {
    const top = this.topCustomers();
    return {
      labels: top.map(c => c.name),
      datasets: [{
        label: 'Outstanding Balance',
        data: top.map(c => c.currentBalance),
        backgroundColor: top.map(c => c.currentBalance > 0 ? 'rgba(16, 185, 129, 0.8)' : 'rgba(239, 68, 68, 0.8)'),
        borderRadius: 8,
        borderSkipped: false,
        barThickness: 24
      }]
    };
  });

  // Customer distribution pie chart
  distributionChartData = computed<ChartData<'doughnut'>>(() => {
    const dist = this.customerDistribution();
    return {
      labels: ['You\'ll Get', 'You\'ll Give'],
      datasets: [{
        data: [dist.creditors, dist.debtors],
        backgroundColor: ['#10b981', '#ef4444'],
        hoverOffset: 15,
        borderWidth: 0,
        borderRadius: 4
      }]
    };
  });

  // Chart configurations
  lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, position: 'top' }
    },
    scales: {
      y: { beginAtZero: true }
    }
  };

  barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y',
    plugins: {
      legend: { display: false }
    }
  };

  doughnutChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, position: 'bottom' }
    }
  };

  goBack() {
    this.router.navigate(['/']);
  }

  setDateRange(range: DateRange) {
    this.dateRange.set(range);
  }
}

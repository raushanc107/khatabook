import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import { CustomerListComponent } from '../customer-list/customer-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ThemeService } from '../../core/services/theme.service';
import { PullToRefreshComponent } from '../../shared/components/pull-to-refresh/pull-to-refresh';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CustomerListComponent, MatMenuModule, MatIconModule, MatButtonModule, PullToRefreshComponent],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class DashboardComponent {
    public router = inject(Router);
    public themeService = inject(ThemeService);

    handleRefresh() {
        // Full reload to check for SW updates and clear state if needed
        window.location.reload();
    }
    // Helper to determine if we should show the list on mobile
    // If we are NOT on a customer page, we should show the list.
    get showListOnMobile(): boolean {
        return !this.router.url.includes('/customer/');
    }
}

import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router, NavigationEnd, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs/operators';
import { CustomerListComponent } from '../customer-list/customer-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { ThemeService } from '../../core/services/theme.service';
import { PullToRefreshComponent } from '../../shared/components/pull-to-refresh/pull-to-refresh';
import { LocalStorageService } from '../../core/services/local-storage.service';
import { InfoDialogComponent } from '../../shared/components/info-dialog/info-dialog';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, CustomerListComponent, MatMenuModule, MatIconModule, MatButtonModule, PullToRefreshComponent],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class DashboardComponent {
    public router = inject(Router);
    public themeService = inject(ThemeService);
    private localStorageService = inject(LocalStorageService);
    private dialog = inject(MatDialog);

    // Track URL changes as a signal
    private url = toSignal(
        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd),
            map(() => this.router.url)
        ),
        { initialValue: this.router.url }
    );

    // Derived signal for visibility
    public showListOnMobile = computed(() => !this.url().includes('/customer/'));

    handleRefresh() {
        // Full reload to check for SW updates and clear state if needed
        window.location.reload();
    }
}

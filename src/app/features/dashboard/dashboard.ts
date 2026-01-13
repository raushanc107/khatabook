import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import { CustomerListComponent } from '../customer-list/customer-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ThemeService } from '../../core/services/theme.service';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CustomerListComponent, MatMenuModule, MatIconModule, MatButtonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class DashboardComponent {
    public router = inject(Router);
    public themeService = inject(ThemeService);

    // Helper to determine if we should show the list on mobile
    // If URL is exactly '/', show list. If deep link, hide list on mobile.
    get showListOnMobile(): boolean {
        return this.router.url === '/';
    }
}

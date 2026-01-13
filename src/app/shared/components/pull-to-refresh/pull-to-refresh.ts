import { Component, EventEmitter, Output, HostListener, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pull-to-refresh',
  standalone: true,
  imports: [CommonModule],
  host: {
    '[style.display]': "'block'",
    '[style.height]': "'100vh'",
    '[style.width]': "'100%'"
  },
  template: `
    <div class="pull-to-refresh-container" #container>
      <div class="refresh-indicator" [style.transform]="'translateY(' + currentY + 'px)'" [class.refreshing]="refreshing">
        <div class="spinner" *ngIf="refreshing"></div>
        <div class="arrow" *ngIf="!refreshing && currentY > 20" [style.transform]="'rotate(' + (currentY * 2) + 'deg)'">↓</div>
      </div>
      <div class="content" [style.transform]="'translateY(' + currentY + 'px)'" [class.refreshing]="refreshing">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [`
    .pull-to-refresh-container {
      position: relative;
      overflow: hidden;
      height: 100%;
    }
    .refresh-indicator {
      position: absolute;
      top: -50px;
      left: 0;
      right: 0;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 100;
      transition: transform 0.1s ease-out;
      pointer-events: none;
    }
    .refresh-indicator.refreshing {
      transform: translateY(60px) !important;
      transition: transform 0.3s ease-in-out;
    }
    .content {
      height: 100%;
      overflow-y: auto;
      transition: transform 0.1s ease-out;
      -webkit-overflow-scrolling: touch;
    }
    .content.refreshing {
      transform: translateY(50px) !important;
      transition: transform 0.3s ease-in-out;
    }
    .spinner {
      width: 24px;
      height: 24px;
      border: 3px solid var(--primary-light);
      border-top: 3px solid var(--primary-color);
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
    .arrow {
      font-size: 24px;
      color: var(--primary-color);
      font-weight: bold;
    }
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `]
})
export class PullToRefreshComponent {
  @Output() refresh = new EventEmitter<void>();
  @ViewChild('container') container!: ElementRef;

  private startY = 0;
  currentY = 0;
  refreshing = false;
  private pullThreshold = 80;

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    const content = this.container.nativeElement.querySelector('.content');
    if (content.scrollTop === 0) {
      this.startY = event.touches[0].pageY;
    } else {
      this.startY = -1;
    }
  }

  @HostListener('touchmove', ['$event'])
  onTouchMove(event: TouchEvent) {
    if (this.startY === -1 || this.refreshing) return;

    const y = event.touches[0].pageY;
    const diff = y - this.startY;

    if (diff > 0) {
      // Resistance effect
      this.currentY = Math.pow(diff, 0.85);
      if (this.currentY > 0) {
        event.preventDefault();
      }
    }
  }

  @HostListener('touchend')
  onTouchEnd() {
    if (this.startY === -1 || this.refreshing) return;

    if (this.currentY >= this.pullThreshold) {
      this.triggerRefresh();
    } else {
      this.reset();
    }
  }

  private triggerRefresh() {
    this.refreshing = true;
    this.refresh.emit();
    
    // Safety timeout in case parent doesn't handle finishing
    setTimeout(() => this.finishRefresh(), 2000);
  }

  finishRefresh() {
    this.refreshing = false;
    this.reset();
  }

  private reset() {
    this.currentY = 0;
    this.startY = -1;
  }
}

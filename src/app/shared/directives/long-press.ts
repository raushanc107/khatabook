import { Directive, EventEmitter, Output, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appLongPress]',
  standalone: true
})
export class LongPressDirective {
  @Output() longPress = new EventEmitter<void>();
  @Input() duration = 500;

  private timeoutId: any;
  private isLongPressing = false;
  private isTouch = false;
  private startX = 0;
  private startY = 0;
  private readonly moveThreshold = 10;

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    if (this.isTouch) return; // Ignore mouse events if touch triggered
    if (event.button !== 0) return; // Only left click

    this.startPress(event.clientX, event.clientY);
  }

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    this.isTouch = true;
    if (event.touches.length !== 1) return; // Only single touch

    const touch = event.touches[0];
    this.startPress(touch.clientX, touch.clientY);
  }

  private startPress(x: number, y: number) {
    this.isLongPressing = false;
    this.startX = x;
    this.startY = y;

    this.timeoutId = setTimeout(() => {
      this.isLongPressing = true;
      this.longPress.emit();
      // Vibrate for feedback
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
          navigator.vibrate(50);
      }
    }, this.duration);
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.isTouch) return;
    this.checkMove(event.clientX, event.clientY);
  }

  @HostListener('touchmove', ['$event'])
  onTouchMove(event: TouchEvent) {
    if(event.touches.length !== 1) return;
    const touch = event.touches[0];
    this.checkMove(touch.clientX, touch.clientY);
  }

  private checkMove(x: number, y: number) {
      if (!this.timeoutId) return;

      const diffX = Math.abs(x - this.startX);
      const diffY = Math.abs(y - this.startY);

      if (diffX > this.moveThreshold || diffY > this.moveThreshold) {
          this.cancel();
      }
  }

  @HostListener('mouseup')
  @HostListener('mouseleave')
  @HostListener('touchend')
  @HostListener('touchcancel')
  onRelease() {
    this.cancel();
  }
  
  // Cleanup if scroll happens
  @HostListener('window:scroll')
  onScroll() {
      if (this.timeoutId) this.cancel();
  }

  private cancel() {
    clearTimeout(this.timeoutId);
    this.timeoutId = null;
    // Reset isTouch flag after a delay to allow mixed interactions? 
    // Usually not needed if we just guard mousedown.
    // But let's keep isTouch true for a bit to prevent ghost clicks.
    setTimeout(() => this.isTouch = false, 500);
  }

  @HostListener('contextmenu', ['$event'])
  onContextMenu(event: Event) {
      // If we are long pressing, we definitely want to prevent context menu
      // But simply creating a long press listener shouldn't disable right click always.
      // However, on mobile, long press IS context menu. 
      // So we prevent default only if we successfully long pressed?
      // Check if longpress happened recently?
      // For now, let's aggressively prevent it on the trigger element to be safe.
      event.preventDefault();
  }
}

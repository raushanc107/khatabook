import { Injectable, signal, effect, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta } from '@angular/platform-browser';

export type Theme = 'light' | 'dark' | 'system';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private document = inject(DOCUMENT);
  private meta = inject(Meta);
  
  // Signal to track current preference
  currentTheme = signal<Theme>('system');

  constructor() {
    // Load from storage or default to system
    const stored = localStorage.getItem('theme') as Theme;
    if (stored) {
      this.currentTheme.set(stored);
    }
    
    // Effect to apply theme whenever signal changes
    effect(() => {
       const theme = this.currentTheme();
       this.applyTheme(theme);
       localStorage.setItem('theme', theme);
    });
    
    // Listen for system changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', () => {
        if (this.currentTheme() === 'system') {
            this.applyTheme('system');
        }
    });
  }

  toggleTheme() {
    const current = this.currentTheme();
    if (current === 'light') {
        this.currentTheme.set('dark');
    } else if (current === 'dark') {
        this.currentTheme.set('light'); // Cycle: light -> dark -> light (or system?)
        // Let's stick to simple Light/Dark toggle for the button, 
        // maybe a separate "Reset to System" option in a real settings menu.
        // For this simple icon toggle, user usually expects immediate switch.
    } else {
        // If system, switch to the *opposite* of what system currently is
        const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        this.currentTheme.set(isSystemDark ? 'light' : 'dark');
    }
  }
  
  setTheme(theme: Theme) {
      this.currentTheme.set(theme);
  }

  private applyTheme(theme: Theme) {
    const body = this.document.body;
    body.classList.remove('light-theme', 'dark-theme');
    
    let activeTheme: 'light' | 'dark';
    if (theme === 'system') {
      activeTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } else {
      activeTheme = theme as 'light' | 'dark';
    }

    body.classList.add(`${activeTheme}-theme`);
    
    // Update theme-color meta tag for PWA and iOS
    const themeColor = activeTheme === 'dark' ? '#1e1e1e' : '#ffffff';
    this.meta.updateTag({ name: 'theme-color', content: themeColor });
  }
}

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
  
  // Signal to track the actual system value
  private systemQuery = window.matchMedia('(prefers-color-scheme: dark)');
  resolvedSystemTheme = signal<'dark' | 'light'>(this.systemQuery.matches ? 'dark' : 'light');

  constructor() {
    // Migration: Force reset to 'system' for existing users to ensure they get the new behavior
    const THEME_VERSION = 'v2';
    const storedVersion = localStorage.getItem('theme_version');
    
    if (storedVersion !== THEME_VERSION) {
        // Clear legacy theme preference to default to 'system'
        localStorage.removeItem('theme');
        localStorage.setItem('theme_version', THEME_VERSION);
    }

    // Load from storage or default to system
    const stored = localStorage.getItem('theme') as Theme;
    if (stored) {
      this.currentTheme.set(stored);
    }
    
    // Listen for system changes
    this.systemQuery.addEventListener('change', (e) => {
        const newSystemTheme = e.matches ? 'dark' : 'light';
        this.resolvedSystemTheme.set(newSystemTheme);
    });
    
    // Effect to apply theme whenever signal changes (preference or system)
    effect(() => {
       const theme = this.currentTheme();
       const systemTheme = this.resolvedSystemTheme();
       
       this.applyTheme(theme, systemTheme);
       localStorage.setItem('theme', theme);
    });
  }

  toggleTheme() {
    // Legacy support if needed, or remove
    const current = this.currentTheme();
    if (current === 'system') {
        const next = this.resolvedSystemTheme() === 'dark' ? 'light' : 'dark';
        this.currentTheme.set(next);
    } else {
        this.currentTheme.set(current === 'dark' ? 'light' : 'dark');
    }
  }
  
  setTheme(theme: Theme) {
      this.currentTheme.set(theme);
  }

  private applyTheme(theme: Theme, systemTheme: 'dark' | 'light') {
    const body = this.document.body;
    body.classList.remove('light-theme', 'dark-theme');
    
    // Determine active visual theme
    const visualTheme = theme === 'system' ? systemTheme : theme;
    
    // Always apply the corresponding class to ensure consistent styling (mixins, variables)
    body.classList.add(`${visualTheme}-theme`);
    
    // Update theme-color meta tag for PWA and iOS
    const themeColor = visualTheme === 'dark' ? '#1e1e1e' : '#ffffff';
    this.meta.updateTag({ name: 'theme-color', content: themeColor });
    
    // Update color-scheme meta tag
    this.meta.updateTag({ name: 'color-scheme', content: theme === 'system' ? 'light dark' : visualTheme });
  }
}

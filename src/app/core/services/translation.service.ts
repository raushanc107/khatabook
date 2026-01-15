import { Injectable, signal, computed } from '@angular/core';
import { AppTranslations, EN_TRANSLATIONS, HI_TRANSLATIONS } from '../models/translations';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private readonly LANGUAGE_KEY = 'khatabook_language';
  
  // Signal to hold current language code
  private currentLangCode = signal<'en' | 'hi'>(this.getSavedLanguage() || 'en');

  // Computed signal to return the active translation map
  public t = computed<AppTranslations>(() => {
    return this.currentLangCode() === 'hi' ? HI_TRANSLATIONS : EN_TRANSLATIONS;
  });

  setLanguage(lang: 'en' | 'hi') {
    this.currentLangCode.set(lang);
    localStorage.setItem(this.LANGUAGE_KEY, lang);
  }

  getCurrentLanguage(): 'en' | 'hi' {
    return this.currentLangCode();
  }

  // Check if language has been explicitly set by user (for first launch check)
  isLanguageSet(): boolean {
    return !!localStorage.getItem(this.LANGUAGE_KEY);
  }

  private getSavedLanguage(): 'en' | 'hi' | null {
    const saved = localStorage.getItem(this.LANGUAGE_KEY);
    return (saved === 'en' || saved === 'hi') ? saved : null;
  }
}

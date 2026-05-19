import { Injectable, signal } from '@angular/core';
import { Lang, TRANSLATIONS } from './translations';

const STORAGE_KEY = 'tfg-finder-lang';

@Injectable({ providedIn: 'root' })
export class TranslationService {
  readonly lang = signal<Lang>(this.initialLang());

  setLang(lang: Lang): void {
    this.lang.set(lang);
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
  }

  translate(key: string): string {
    const entry = TRANSLATIONS[key];
    if (!entry) {
      return key;
    }
    return entry[this.lang()];
  }

  private initialLang(): Lang {
    const stored = localStorage.getItem(STORAGE_KEY);
    const lang: Lang =
      stored === 'ca' || stored === 'es' || stored === 'en' ? stored : 'ca';
    document.documentElement.lang = lang;
    return lang;
  }
}

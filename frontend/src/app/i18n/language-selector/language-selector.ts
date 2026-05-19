import { Component, inject } from '@angular/core';
import { TranslationService } from '../translation.service';
import { LANGUAGES } from '../translations';

@Component({
  selector: 'app-language-selector',
  imports: [],
  templateUrl: './language-selector.html',
  styleUrl: './language-selector.css',
})
export class LanguageSelector {
  readonly i18n = inject(TranslationService);
  readonly languages = LANGUAGES;
}

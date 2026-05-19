import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LanguageSelector } from './i18n/language-selector/language-selector';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LanguageSelector],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}
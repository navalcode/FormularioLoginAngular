import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { getCopy, Language } from './i18n';

@Component({selector: 'app-root', templateUrl: './app.component.html', styleUrls: ['./app.component.css']})
export class AppComponent {
  language: Language = 'es';
  get copy() { return getCopy(this.language); }
  constructor(@Inject(DOCUMENT) private document: Document) { this.setLanguage('es'); }
  setLanguage(language: Language): void {
    this.language = language;
    this.document.documentElement.lang = language;
    this.document.title = this.copy.title;
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { getCopy, Language } from '../i18n';
@Component({selector: 'app-toolbar', templateUrl: './my-toolbar.component.html', styleUrls: ['./my-toolbar.component.css']})
export class MyToolbarComponent {
  @Input() language: Language = 'en';
  @Output() languageChange = new EventEmitter<Language>();
  get copy() { return getCopy(this.language); }
}

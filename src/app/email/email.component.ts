import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { getCopy, Language } from '../i18n';
@Component({selector: 'app-email', templateUrl: './email.component.html', styleUrls: ['./email.component.css']})
export class EmailComponent {
  @Input() language: Language = 'en';
  @ViewChild('emailInput') emailInput!: ElementRef<HTMLInputElement>;
  @ViewChild('passwordInput') passwordInput!: ElementRef<HTMLInputElement>;
  email = '';
  password = '';
  passwordVisible = false;
  attempted = false;
  result: '' | 'checked' | 'cleared' = '';
  get copy() { return getCopy(this.language); }
  dismissResult(): void { this.result = ''; }
  submit(form: NgForm): void {
    this.result = '';
    this.attempted = true;
    if (form.invalid) {
      (form.controls.email.invalid ? this.emailInput : this.passwordInput).nativeElement.focus();
      return;
    }
    form.resetForm({email: this.email, password: ''});
    this.passwordVisible = false;
    this.attempted = false;
    this.result = 'checked';
  }
  clear(form: NgForm): void {
    form.resetForm({email: '', password: ''});
    this.passwordVisible = false;
    this.attempted = false;
    this.result = 'cleared';
    this.emailInput.nativeElement.focus();
  }
}

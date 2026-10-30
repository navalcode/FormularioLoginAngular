import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MyToolbarComponent } from './my-toolbar/my-toolbar.component';
import { EmailComponent } from './email/email.component';

@NgModule({declarations: [AppComponent, MyToolbarComponent, EmailComponent], imports: [BrowserModule, FormsModule], bootstrap: [AppComponent]})
export class AppModule { }

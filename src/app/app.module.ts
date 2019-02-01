import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormComponent } from './components/form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PersonFormComponent } from './components/form/person-form/person-form.component';
import { PersonTableComponent } from './components/form/person-table/person-table.component';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    PersonFormComponent,
    PersonTableComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PersonFormComponent } from '@components/person-form/person-form.component';
import { PersonTableComponent } from '@components/person-table/person-table.component';
import { PersonService } from '@services/person.service';

@NgModule({
  declarations: [
    AppComponent,
    PersonFormComponent,
    PersonTableComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [PersonService],
  bootstrap: [AppComponent]
})
export class AppModule { }

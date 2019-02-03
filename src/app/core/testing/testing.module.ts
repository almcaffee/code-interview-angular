import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserTestingModule } from '@angular/platform-browser/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PersonService } from '@services/person.service';

@NgModule({
  imports: [
    BrowserTestingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ PersonService ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class TestingModule { }

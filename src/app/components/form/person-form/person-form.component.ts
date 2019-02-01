import { Component, Input, Output, OnInit, OnDestroy, OnChanges, EventEmitter, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Person } from '@models';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.css']
})
export class PersonFormComponent implements OnInit, OnDestroy, OnChanges {

  @Output() savedPerson = new EventEmitter<Person>();
  @Input() peopleCount: number;

  personForm: FormGroup;
  subs: Subscription[] = [];

  constructor() { }

  ngOnInit() {
    this.setupForm();
  }

  // When we emit the person to save the array size will change patch the new id value to the form
  ngOnChanges(changes: SimpleChanges) {
    if(changes['peopleCount']) {
      // Make sure not to try to change before formGroup is defined
      if(changes['peopleCount'].currentValue && this.personForm) {
        this.patchFormValue('id', this.peopleCount + 1);
      }
    }
  }

  // Lets get rid of our subs to clear memory
  ngOnDestroy() {
    this.subs.forEach(s=> s.unsubscribe());
  }

  // Test minimal validation then emit to parent
  savePerson() {
    if(this.personForm.valid) {
      this.savedPerson.emit(this.personForm.value);
      this.personForm.reset();
    }
  }

  // Patch a value to the form by control name
  patchFormValue(controlName: string, val: string | number) {
    const control = this.personForm.get(controlName);
    control.patchValue(val);
  }

  // Initialize reactive form
  setupForm() {
    this.personForm = new FormGroup({
      id: new FormControl(null, Validators.required),
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required)
    });

    // Lets make sure we have passed the value before patching
    if(this.peopleCount) {
      this.patchFormValue('id', this.peopleCount + 1);
    } else {
      this.patchFormValue('id', 1);
    }

    // Subscribe to the form changes
    // this.subs.push(this.personForm.valueChanges.subscribe(value=> {
    //   console.log(value)
    // }));
  }

}

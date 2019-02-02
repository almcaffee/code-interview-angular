import { Component, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Person } from '@models';
import { PersonService } from '@services/person.service';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.css']
})
export class PersonFormComponent implements OnInit, OnDestroy {

  editing: boolean;
  personForm: FormGroup;
  subs: Subscription[] = [];

  constructor(private ps: PersonService) {
    // Service lets us know when array of people changes
    this.subs.push(this.ps.activeEditSub$.subscribe(editing => this.editing = editing));
  }

  ngOnInit() {
    this.setupForm();
  }

  // Lets get rid of our subs to clear memory
  ngOnDestroy() {
    this.subs.forEach(s=> s.unsubscribe());
  }

  // Test minimal validation then emit to parent
  addPerson() {
    if(this.personForm.valid) {
      this.ps.addPerson(this.personForm.value);
      this.personForm.reset();
    }
  }

  // Initialize reactive form
  setupForm() {
    this.personForm = new FormGroup({
      id: new FormControl({value: null, disabled: true }),
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required)
    });
    // Subscribe to the form changes
    this.subs.push(this.personForm.valueChanges.subscribe(value=> console.log(value)));
  }

}

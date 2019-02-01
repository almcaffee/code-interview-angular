import { Component, Input, Output, OnInit, OnDestroy, EventEmitter, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Person } from '@models';

@Component({
  selector: 'app-person-table',
  templateUrl: './person-table.component.html',
  styleUrls: ['./person-table.component.css']
})
export class PersonTableComponent implements OnInit, OnDestroy {

  @Output() removedPerson = new EventEmitter<number>();
  @Output() savedPerson = new EventEmitter<Person>();
  @Input() people: Person[];

  activePerson: Person;
  personForm: FormGroup;
  subs: Subscription[] = [];

  constructor() { }

  ngOnInit() {
  }

  // When we emit the person to save the array size will change patch the new id value to the form
  ngOnChanges(changes: SimpleChanges) {
    if(changes['people']) {
      // Make sure not to try to change before formGroup is defined
      if(changes['people'].currentValue) {
        console.log(this.people);
      }
    }
  }

  ngOnDestroy() {
    this.subs.forEach(s=> s.unsubscribe());
  }

  // Cancel the active edit
  cancelEdit() {
    this.activePerson = null;
    this.personForm = null;
  }

  // Set state variable to initialize input row render
  editPerson(person: Person) {
    this.setupForm(person);
  }

  // Emit id of person to remove to parent
  removePerson(id: number) {
    this.removedPerson.emit(id);
    if(this.activePerson) this.cancelEdit();
  }

  // Test minimal validation then emit to parent
  savePerson() {
    if(this.personForm.valid) {
      this.savedPerson.emit(this.personForm.value);
      this.personForm.reset();
    }
  }

  // Initialize reactive form
  setupForm(activePerson: Person) {
    this.personForm = new FormGroup({
      id: new FormControl(activePerson.id, Validators.required),
      firstName: new FormControl(activePerson.firstName, Validators.required),
      lastName: new FormControl(activePerson.lastName, Validators.required),
      city: new FormControl(activePerson.city, Validators.required)
    });
    // Subscribe to the form changes
    this.subs.push(this.personForm.valueChanges.subscribe(value=> console.log(value)));
    // Give activePerson value after form so we dont try to display edit form before formGroup setup
    this.activePerson = activePerson;
  }

}

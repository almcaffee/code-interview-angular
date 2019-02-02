import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, Subscription, pipe } from 'rxjs';
import { first } from 'rxjs/operators';
import { Person } from '@models';
import { PersonService } from '@services/person.service';

@Component({
  selector: 'app-person-table',
  templateUrl: './person-table.component.html',
  styleUrls: ['./person-table.component.css']
})
export class PersonTableComponent implements OnInit, OnDestroy {

  activePerson: Person;
  personForm: FormGroup;
  people: Person[];
  subs: Subscription[] = [];

  constructor(private ps: PersonService) {
    // Service lets us know when array of people changes
    this.subs.push(this.ps.peopleSub$.subscribe(people => this.people = people));
  }

  ngOnInit() {
    // Get the current people let subscription replace people
    this.ps.getPeople()
    .subscribe(people=> this.people = people)
    .unsubscribe();
  }

  // Clear subscriptions from memory
  ngOnDestroy() {
    this.subs.forEach(s=> s.unsubscribe());
  }

  // Cancel the active edit
  cancelEdit() {
    this.activePerson = null;
    this.personForm = null;
    this.ps.editMode(false);
  }

  // Set state variable to initialize input row render
  editPerson(person: Person) {
    this.ps.editMode(true);
    this.setupForm(person);
  }

  // Call service remove fn
  removePerson(id: number) {
    this.ps.removePerson(id);
    if(this.activePerson) this.cancelEdit();
  }

  // Test minimal validation then call service save fn
  savePerson() {
    if(this.personForm.valid) {
      this.ps.savePerson(this.personForm.value);
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

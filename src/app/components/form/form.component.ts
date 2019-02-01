import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PersonFormComponent } from './person-form/person-form.component';
import { PersonTableComponent } from './person-table/person-table.component';
import { Person } from '@models';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent implements OnInit {

  people: Person[] = [];

  constructor() { }

  ngOnInit() {

    // Just some test data
    this.people = [
      { id: 1, firstName: 'Ollie', lastName: 'Tinsley', city: 'Fairfax' },
      { id: 2, firstName: 'Lebron', lastName: 'James', city: 'Anywhere' },
      { id: 3, firstName: 'Bobby', lastName: 'Brown', city: 'Memphis' },
      { id: 4, firstName: 'Stacy', lastName: 'McNeil', city: 'Fairfax' },
      { id: 5, firstName: 'Jimmy', lastName: 'Butler', city: 'Philly' }
    ];
  }

  // Add/Change person
  savePerson(person: Person) {
    let findPersonIndex = this.people.findIndex(p=> p.id === person.id);
    if(findPersonIndex > -1) {
      this.people[findPersonIndex] = person;
    } else {
      this.people.push(person);
    }
  }

  // Remove person
  removePerson(id: number) {
    let newPeople = this.people.filter(p=> p.id != id);
    this.people = newPeople;
  }

}

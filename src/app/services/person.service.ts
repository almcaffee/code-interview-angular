import { Injectable } from '@angular/core';
import { Observable, Subject, Subscription, timer, of } from 'rxjs';
import { Person } from '@models';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  // Just some test data to start with
  people = [
    { id: 1, firstName: 'Ollie', lastName: 'Tinsley', city: 'Fairfax' },
    { id: 2, firstName: 'Lebron', lastName: 'James', city: 'Anywhere' },
    { id: 3, firstName: 'Bobby', lastName: 'Brown', city: 'Memphis' },
    { id: 4, firstName: 'Stacy', lastName: 'McNeil', city: 'Fairfax' },
    { id: 5, firstName: 'Jimmy', lastName: 'Butler', city: 'Philly' }
  ];

  private activeEditSubject = new Subject<boolean>();
  activeEditSub$ = this.activeEditSubject.asObservable();
  private peopleSubject = new Subject<Person[]>();
  peopleSub$ = this.peopleSubject.asObservable();

  constructor() {}

  getPeople(): Observable<Person[]> {
    return of(this.people);
  }

  // Add person
  addPerson(person: Person) {
    this.people.push(Object.assign(person, { id: this.people[this.people.length - 1].id + 1 }));
    this.peopleSubject.next(this.people);
  }

  editMode(editing: boolean) {
    this.activeEditSubject.next(editing);
  }

  // Remove person
  removePerson(id: number) {
    this.people = this.people.filter(p=> p.id != id);
    this.peopleSubject.next(this.people);
  }

  // Change person
  savePerson(person: Person) {
    this.people[this.people.findIndex(p=> p.id === person.id)] = person;
    this.peopleSubject.next(this.people);
    this.editMode(false);
  }

}

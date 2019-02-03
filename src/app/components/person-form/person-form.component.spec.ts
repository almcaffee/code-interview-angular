import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonFormComponent } from './person-form.component';
import { PersonService } from '@services/person.service';
import { Imports } from '@test/imports';
import { Providers } from '@test/providers';

describe('PersonFormComponent', () => {
  let component: PersonFormComponent;
  let fixture: ComponentFixture<PersonFormComponent>;
  let personService: PersonService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonFormComponent ],
      imports: Imports,
      providers: Providers
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

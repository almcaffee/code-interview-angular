import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingModule } from '@test/testing.module';
import { PersonTableComponent } from './person-table.component';
import { PersonService } from '@services/person.service';
import { Imports } from '@test/imports';
import { Providers } from '@test/providers';

describe('PersonTableComponent', () => {
  let component: PersonTableComponent;
  let fixture: ComponentFixture<PersonTableComponent>;
  let personService: PersonService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonTableComponent ],
      imports: Imports,
      providers: Providers
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

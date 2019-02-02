import { Component } from '@angular/core';
import { PersonFormComponent } from '@components/person-form/person-form.component';
import { PersonTableComponent } from '@components/person-table/person-table.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'test-app';
}

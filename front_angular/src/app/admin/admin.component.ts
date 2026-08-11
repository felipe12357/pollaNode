import { Component } from '@angular/core';
import { InputSearchComponent } from '../shared/input-search/input-search.component';
import { RouterLink } from '@angular/router';
import { InputSearchObservableComponent } from '../shared/input-search-observable.component/input-search-observable.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
  standalone: true,
  imports: [ InputSearchComponent, RouterLink, InputSearchObservableComponent ]
})
export class AdminComponent {
}

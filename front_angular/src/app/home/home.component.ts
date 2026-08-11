import { Component, inject, signal } from '@angular/core';
import { ForecastService } from '../services/forecast.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { NgClass } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { RouterLink } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FaIconComponent, NgClass, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private readonly forecastService = inject(ForecastService);
  private readonly userService = inject(UserService);

  readonly resultSignal = toSignal(this.forecastService.getAll(), { initialValue: [] });
  readonly currentUsername = signal(this.userService.currentUser()?.username);
  readonly faMagnifyingGlass = faMagnifyingGlass;

}

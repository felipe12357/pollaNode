import { Component, inject, signal } from '@angular/core';
import { ForecastService } from '../services/forecast.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { MenuComponent, MenuOption } from '../shared/menu/menu.component';
import { NgClass } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MenuComponent, FaIconComponent, NgClass],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private readonly forecastService = inject(ForecastService);
  private readonly localStorageService = inject(LocalStorageService);

  readonly resultSignal = toSignal(this.forecastService.get(), { initialValue: [] });
  readonly currentRole = signal('admin');
  readonly currentUsername = signal(this.localStorageService.get()?.username ?? '');
  readonly faMagnifyingGlass = faMagnifyingGlass;

  readonly menuOptions: MenuOption[] = [
    { label: 'admin', route: '/admin', roles: ['admin'] },
    { label: 'Pronósticos', route: '/home', roles: ['admin', 'user'] },
  ];
}

import { Component, inject, signal } from '@angular/core';
import { ForecastService } from '../services/forecast.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { MenuComponent, MenuOption } from '../shared/menu/menu.component';

@Component({
  selector: 'app-home',
  imports: [MenuComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private readonly forecastService = inject(ForecastService);
  readonly resultSignal = toSignal(this.forecastService.get(), { initialValue: [] });

  readonly currentRole = signal('admin');

  readonly menuOptions: MenuOption[] = [
    { label: 'admin', route: '/admin', roles: ['admin'] },
    { label: 'Pronósticos', route: '/home', roles: ['admin', 'user'] },
  ];
}

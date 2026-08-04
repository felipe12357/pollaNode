import { Component, inject } from '@angular/core';
import { ForecastService } from '../services/forecast.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private readonly forecastService = inject(ForecastService);
  readonly resultSignal =  toSignal(this.forecastService.get(),  { initialValue: [] })
}

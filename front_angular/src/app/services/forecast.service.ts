import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../enviroments/enviroment';
import { ForecastResult } from '../models/forecast.model';

@Service()
export class ForecastService {
  private readonly httpClient = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/forecast`;

  getAll(): Observable<ForecastResult[]> {
    return this.httpClient.get<ForecastResult[]>(`${this.apiUrl}/`);
  }

  get(userId: string): Observable<ForecastResult[]> {
    return this.httpClient.get<ForecastResult[]>(`${this.apiUrl}/${userId}`);
  }
}

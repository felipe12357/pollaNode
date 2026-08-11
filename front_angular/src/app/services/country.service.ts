import { inject, Service } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { Country } from '../models/country.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../enviroments/enviroment';

@Service()
export class CountryService {
  private readonly httpClient = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/country`;
  countryList$ = this.getAll().pipe(shareReplay(1));

  getAll(): Observable<Country[]>{
    return this.httpClient.get<Country[]>(this.apiUrl);
  }
}

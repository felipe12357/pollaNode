import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { UserLogin, UserLoginResponse } from '../models/user.model';
import { Observable, tap } from 'rxjs';
import { environment } from '../../enviroments/enviroment';
import { LocalStorageService } from './local-storage.service';

@Service()
export class UserService {
  private readonly httpClient = inject(HttpClient);
  private readonly localStorageService = inject(LocalStorageService);
  private readonly apiUrl = `${environment.apiUrl}/user`;

  login(data: UserLogin): Observable<UserLoginResponse> {
    return this.httpClient.get<UserLoginResponse>(`${this.apiUrl}/login`, { params: data }).pipe(
      tap((response) => {
        this.localStorageService.set({
          username: response.username,
          role: response.role,
          token: response.token,
        });
      })
    );
  }
}

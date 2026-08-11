import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { User, UserLogin, UserLoginResponse } from '../models/user.model';
import { Observable, tap } from 'rxjs';
import { environment } from '../../enviroments/enviroment';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly httpClient = inject(HttpClient);
  private readonly localStorageService = inject(LocalStorageService);
  private readonly apiUrl = `${environment.apiUrl}/user`;

  currentUser = signal<User | null>(null)

  constructor() {
    const currentUser = this.localStorageService.get();

    if(currentUser) {
      const { token, ...user} = currentUser;
      this.currentUser.set(user);
    }
  }

  login(data: UserLogin): Observable<UserLoginResponse> {
    return this.httpClient.get<UserLoginResponse>(`${this.apiUrl}/login`, { params: data }).pipe(
      tap((response) => {
        const { token, ...user} = response;

        this.localStorageService.set(response);
        this.currentUser.set({...user});
      })
    );
  }
}

import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { UserLogin, UserLoginResponse } from '../models/user.model';
import { Observable } from 'rxjs';
import { environment } from '../../enviroments/enviroment';

@Service()
export class UserService {

  private httpClient = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/user`;

  login(data: UserLogin): Observable<UserLoginResponse> {
    return this.httpClient.get<UserLoginResponse>(`${this.apiUrl}/login`,{params:data})
  }
}

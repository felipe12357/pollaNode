import { Injectable } from '@angular/core';
import { UserLoginResponse, UserSession } from '../models/user.model';


@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private readonly storageKey = 'auth-user';

  set(data: UserLoginResponse): void {
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  clean(): void {
    localStorage.removeItem(this.storageKey)
  }

  get(): UserLoginResponse | null {
    const storedValue = localStorage.getItem(this.storageKey);

    if (!storedValue) {
      return null;
    }

    return JSON.parse(storedValue) as UserLoginResponse;
  }
}

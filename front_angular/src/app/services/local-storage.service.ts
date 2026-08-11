import { Injectable } from '@angular/core';
import { UserSession } from '../models/user.model';


@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private readonly storageKey = 'auth-user';

  set(data: UserSession): void {
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  get(): UserSession | null {
    const storedValue = localStorage.getItem(this.storageKey);

    if (!storedValue) {
      return null;
    }

    return JSON.parse(storedValue) as UserSession;
  }
}

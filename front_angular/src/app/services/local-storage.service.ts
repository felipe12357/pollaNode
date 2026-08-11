import { Injectable } from '@angular/core';
import { UserSession } from '../models/user.model';


@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private readonly storageKey = 'auth-user';

  set(data: UserSession): void {
    sessionStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  get(): UserSession | null {
    const storedValue = sessionStorage.getItem(this.storageKey);

    if (!storedValue) {
      return null;
    }

    return JSON.parse(storedValue) as UserSession;
  }
}

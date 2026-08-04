import { Injectable } from '@angular/core';

export type LocalStorageData = {
  username: string;
  role: string;
  token: string;
};

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private readonly storageKey = 'auth-user';

  set(data: LocalStorageData): void {
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  get(): LocalStorageData | null {
    const storedValue = localStorage.getItem(this.storageKey);

    if (!storedValue) {
      return null;
    }

    return JSON.parse(storedValue) as LocalStorageData;
  }
}

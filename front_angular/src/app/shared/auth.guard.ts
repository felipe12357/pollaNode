import { Injectable, inject } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  private readonly router = inject(Router);
  private readonly localStorageService = inject(LocalStorageService);

  canActivate(): boolean | UrlTree {
    const authData = this.localStorageService.get();
    const isLoggedIn = !!authData?.token && !!authData?.username;

    if (isLoggedIn) {
      return true;
    }

    return this.router.parseUrl('/login');
  }
}

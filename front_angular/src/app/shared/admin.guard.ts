import { Injectable, inject } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';
import { UserRole } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  private readonly router = inject(Router);
  private readonly localStorageService = inject(LocalStorageService);

  canActivate(): boolean | UrlTree {
    const authData = this.localStorageService.get();
    const isAdmin = authData?.role === UserRole.ADMIN;

    if (isAdmin) {
      return true;
    }

    return this.router.parseUrl('/home');
  }
}

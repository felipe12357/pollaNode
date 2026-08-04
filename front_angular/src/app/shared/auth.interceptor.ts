import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private readonly localStorageService = inject(LocalStorageService);

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const isUserRequest = req.url.includes('/user');

    if (isUserRequest) {
      return next.handle(req);
    }

    const authData = this.localStorageService.get();

    if (!authData?.token) {
      return next.handle(req);
    }

    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authData.token}`,
      },
    });

    return next.handle(authReq);
  }
}

import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.checkAuthorization();
  }

  canActivateChild(): Observable<boolean> {
    return this.checkAuthorization();
  }

  private checkAuthorization(): Observable<boolean> {
    const token = localStorage.getItem('access_token');
    if (token) {
      return this.authService.isAuthorized().pipe(
        map(response => {
          if (response) {
            return true;
          } else {
            this.router.navigate(['/login']);
            return false;
          }
        }),
        catchError(() => {
          this.router.navigate(['/login']);
          return of(false);
        })
      );
    } else {
      this.router.navigate(['/login']);
      return of(false);
    }
  }
}

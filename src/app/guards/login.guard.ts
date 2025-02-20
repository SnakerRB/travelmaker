import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../servicios/auth.service';
import { Observable, map, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): Observable<boolean> {
    return this.authService.isLoggedIn().pipe(
      take(1),
      map((isLoggedIn: boolean) => {
        if (isLoggedIn) {
// Suggested code may be subject to a license. Learn more: ~LicenseLog:2472542560.
          this.router.navigate(['/userpanel']);
          return false;
        }
        return true;
      })
    );
  }
}

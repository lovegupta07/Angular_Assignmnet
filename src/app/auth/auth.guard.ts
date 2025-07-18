import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}
  canActivate(): boolean {
    const loggedIn = this.auth.isLoggedIn();
    console.log('AuthGuard check - isLoggedIn:', loggedIn);
    if (loggedIn) return true;
    this.router.navigate(['/login']);
    return false;
  }
}

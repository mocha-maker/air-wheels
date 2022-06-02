import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  private url!: string;
  constructor(private auth: AuthService, private router: Router) {}

  private handleAuthState(): boolean {
    // If user is already logged in and trying to access an auth page redirect to rentals and return false
    if (this.isAuthPage()) {
      console.log('Already logged in. Redirecting to rentals list page');
      this.router.navigate(['/rentals']);
      return false;
    }
    return true;
  }

  private handleNonAuthState(): boolean {
    // If user is trying to access protected page, redirect to auth page
    if (!this.isAuthPage()) {
      console.log('Redirecting to login page');

      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

  private isAuthPage(): boolean {
    return this.url.includes('login') || this.url.includes('register')
      ? true
      : false;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    console.log('Checking page access');

    this.url = state.url;

    return this.auth.isAuthenticated()
      ? this.handleAuthState()
      : this.handleNonAuthState();
  }
}

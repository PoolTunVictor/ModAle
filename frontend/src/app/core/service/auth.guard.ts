import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean | UrlTree {
    if (this.auth.isLoggedIn()) {
      // Si está logueado, permite el acceso
      return true;
    } else {
      // Si no está logueado, redirige al login
      return this.router.parseUrl('/login');
    }
  }
}

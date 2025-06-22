import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { KeycloakService } from '../service/keycloack.service';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  constructor(
    private keycloakService: KeycloakService,
    private router: Router,
  ) {}

  canActivate(): boolean {
    const isAdmin = this.keycloakService.hasRole('admin');
    if (!isAdmin) {
      this.router.navigate(['/home']);
    }
    return isAdmin;
  }
}

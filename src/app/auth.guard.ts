import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);

  if(localStorage.getItem('User')) {
    return true;
  }

  return authService.isSellerLogged;
};

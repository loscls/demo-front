import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';

// @Injectable()
// class token {
//   isLoggedIn:any;
//   constructor(private sellerService:SellerService) {
//     this.isLoggedIn = sellerService.isSellerLogged;
//   }
// }

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);

  if(localStorage.getItem('seller')) {
    return true;
  }

  return authService.isSellerLogged;
};

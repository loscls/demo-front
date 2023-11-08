import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, retry } from 'rxjs';
import { API } from '../constants';
import { ProductInCart, User, AddToCartRequest, addBalanceRequest } from '../dTypes';
import { SharedService } from './shared.service';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apiService:ApiService, private sharedService:SharedService) { }

  getUser(email:String): Observable<User> {

    let params = {"email":email};

    let u = this.apiService.makeRequest("get", API.user+API.getUser, null, params);

    return u;
  }

  updateUser(email:string, data:object): Observable<void> {

    let params = {"email":email};

    return this.apiService.makeRequest("put", API.user+API.updateUser, data, params);
  }

  addBalance(balance: number): Observable<void> {

    let body: addBalanceRequest = {"balance": balance};

    return this.apiService.makeRequest("put", API.user+API.addBalance, body);

  }

  getCart(): Observable<ProductInCart[]> {

    let pIC = this.apiService.makeRequest("get", API.user+API.getCart);

    return pIC;

  }

  addToCart(unicode: string, quantity: number): Observable<void> {

    let body: AddToCartRequest = {"uniCode": unicode, "quantity": quantity};

    return this.apiService.makeRequest("put", API.user+API.addToCart, body);
  }

  updateProductInCart(unicode:string, quantity:number): Observable<void> {

    let body = {"unicode":unicode, "quantity":quantity};

    return this.apiService.makeRequest("put", API.user+API.updateProductInCart, body);
  }

  removeFromCart(unicode:string, quantity:number): Observable<void> {

    let params = {"unicode":unicode, "quantity":quantity};

    return this.apiService.makeRequest("delete", API.user+API.removeFromCart, null, params);
  }

  buyProduct(unicode:string, quantity:number): Observable<void> {

    let params = {"unicode":unicode, "quantity":quantity};

    return this.apiService.makeRequest("get", API.user+API.buyProduct, null, params);

  }

  getTotalPrice(): Observable<number> {

    return this.apiService.makeRequest("get", API.user+API.getTotalPrice);
  }

  realoadUser(): void {

    this.apiService.makeRequest("get", API.auth+API.reloadUser).subscribe(res => {

      localStorage.setItem('User', JSON.stringify(res));

      localStorage.setItem('UserRole', res.user.role);

    })

  }


}

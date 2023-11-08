import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { API } from '../constants';
import { AuthenticationRequest, RegistrationRequest, User } from '../dTypes';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private sharedService: SharedService,private apiService:ApiService, private router:Router) { }

  isSellerLogged = new BehaviorSubject<boolean>(false);

  signUp(data: RegistrationRequest): void{

    //questa è la richiesta http che verrà fatta db, sarà una post all'endpoint auth/registration
    let result = this.apiService.makeRequest("post", API.auth+API.registration, data);

    result.subscribe((response)=>{

      let request: AuthenticationRequest = {"email": data.email, "password": data.password};

      this.logIn(request);

    });
  }

  reloadSeller(): void {
    if(localStorage.getItem('User')) {
      this.isSellerLogged.next(true);
      this.router.navigate(['profile']);
    }
  }

  logIn(data: AuthenticationRequest): void {

    let result = this.apiService.makeRequest("post", API.auth+API.authenticate, data);

    result.subscribe((response)=>{

      localStorage.setItem('User', JSON.stringify(response));
      this.isSellerLogged.next(true);
      this.router.navigate(['']);

      const user: User = {
        id: response.user.id,
        name: response.user.name,
        surname: response.user.surname,
        email: response.user.email,
        role: response.user.role,
        balance: response.user.balance
      }

      localStorage.setItem('UserRole', user.role);
      this.sharedService.sendClickEvent('login');
    });

  }
}

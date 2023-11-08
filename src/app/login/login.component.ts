import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { SharedService } from '../services/shared.service';
import { AuthenticationRequest } from '../dTypes';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private authService:AuthenticationService, private apiService:ApiService, private sharedService:SharedService, private router:Router) { }

  ngOnInit(): void {
  }

  login(data: AuthenticationRequest): void {
    this.authService.logIn(data);

  }

}

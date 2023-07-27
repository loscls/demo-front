import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private authService:AuthenticationService, private apiService:ApiService, private router:Router) { }

  ngOnInit(): void {
  }

  login(data: Object): void {
    this.authService.logIn(data);
  }

}

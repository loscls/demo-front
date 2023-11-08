import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AuthenticationService } from '../services/authentication.service';
import { RegistrationRequest } from '../dTypes';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css']
})
export class SellerComponent {

  constructor (private authService:AuthenticationService, private apiService:ApiService, private router:Router) { }

  ngOnInit(): void {
    this.authService.reloadSeller();
  }

  signUp(data: RegistrationRequest): void{
    this.authService.signUp(data);
  }

}

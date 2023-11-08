import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  isAdmin: boolean;

  constructor() {

   if(localStorage.getItem("UserRole") != null && localStorage.getItem("UserRole") == "ADMIN") {
    this.isAdmin = true;
   } else {
    this.isAdmin = false;
   }

  }

}

import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  searchTerm: string= "";

  constructor(private sharedService: SharedService, private router:Router)  {

    this.sharedService.getClickEvent().subscribe((value) => {
      if (value == 'login') {
        this.LogInEvent();
      } else if (value == 'updateUser') {
        this.LogOutEvent();
      }
    })

  }

  isLogged: boolean = false;
  isAdmin: boolean = false;

  ngOnInit(): void {

    if(localStorage.getItem('User')) {
      this.isLogged = true;

      if(localStorage.getItem('UserRole') == 'ADMIN') {
        this.isAdmin = true;
      } else {
        this.isAdmin = false;
      }
    }

  }

  LogInEvent(): void {
      this.isLogged = true;
      if(localStorage.getItem('UserRole') == 'ADMIN') {
        this.isAdmin = true;
      } else {
        this.isAdmin = false;
      }
      this.router.navigate(['']);
  }

  LogOutEvent(): void {
    this.isLogged = false;
    this.isAdmin = false;
    localStorage.removeItem('User');
    localStorage.removeItem('token');
    localStorage.removeItem('UserRole');
    this.router.navigate(['']);

  }

}



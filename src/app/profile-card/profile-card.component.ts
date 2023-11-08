import { Component, OnInit } from '@angular/core';
import { User } from '../dTypes';
import { UserService } from '../services/user.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.css']
})
export class ProfileCardComponent implements OnInit {

  profile: User = JSON.parse(localStorage.getItem('User')!)['user'];
  isAdmin: boolean = localStorage.getItem('UserRole') == "ADMIN" ? true : false ;

  addBalanceForm: boolean = false;
  balanceToAdd = new FormControl('', [Validators.required, Validators.pattern(/^\d{1,3}(?:,\d{3})*(?:\.\d{2})?$/)])

  updateForm: boolean = false;
  updateUserForm: FormGroup;

  constructor(private userService:UserService, private sharedService:SharedService, private formBuilder:FormBuilder) {

    this.updateUserForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)]],
      surname: ['', [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)]],
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],

    })

  }

  ngOnInit(): void {
    this.userService.realoadUser();
  }

  activateUpdateForm() {
    if (this.updateForm == false) {
    this.updateForm = true;
    } else {
      this.updateForm = false;
    }
  }

  UpadateUser() {
    if (this.updateUserForm.valid) {
      let email: string;
      email = JSON.parse(localStorage.getItem('User')!)['user']!['email'];
      this.userService.updateUser(email, this.updateUserForm.value).subscribe(res => {
        this.sharedService.sendClickEvent("updateUser");
        this.updateForm = false;
      });
    }
  }

  activateBalanceForm() {
    if (this.addBalanceForm == false) {
    this.addBalanceForm = true;
    } else {
      this.addBalanceForm = false;
    }
  }

  addBalance(): void {
    const balanceValue = parseFloat(this.balanceToAdd.value!);
    this.userService.addBalance(balanceValue).subscribe(res => {
      this.userService.realoadUser();
      window.location.reload();

    })
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Product } from '../dTypes';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit{

  @Input()
  data!: Product;

  quantityArray: number[] = [];

  plusTen: boolean = false;

  qtySelect = new FormControl(1, [Validators.required, Validators.pattern(/^[1-9]\d*$/)]);

  qtyInput: number | undefined;

  constructor(private userService:UserService) {  }

  ngOnInit(): void {
    this.quantityArray = Array.from({length: this.data.quantity > 10 ? 9 : this.data.quantity}, (_, index) => index);

  }

  addToCart() {
    if (this.qtySelect.value != null) {
      if (this.qtyInput) {
        this.userService.addToCart(this.data.uniCode, this.qtyInput).subscribe(res => {})
      } else {
        this.userService.addToCart(this.data.uniCode, this.qtySelect.value).subscribe(res => {});
      }
    }
  }

  event(event: any) {
    if (event.target.value == "10+") {
      this.plusTen = true;
    } else {
      this.plusTen = false;
    }
  }



}

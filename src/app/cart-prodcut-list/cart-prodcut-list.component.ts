import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ProductInCart } from '../dTypes';
import { FormControl, Validators } from '@angular/forms';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-cart-prodcut-list',
  templateUrl: './cart-prodcut-list.component.html',
  styleUrls: ['./cart-prodcut-list.component.css']
})
export class CartProdcutListComponent implements OnInit {

  @Input()
  productInCart!: ProductInCart;

  quantityArray: number[] = [];

  plusTen: boolean = false;

  qtySelect = new FormControl(0, [Validators.required, Validators.pattern(/^[1-9]\d*$/)]);

  qtyInput: number | undefined;

  constructor(private userService: UserService, private sharedService: SharedService) { }

  ngOnInit(): void {
    this.plusTen = this.productInCart.quantity > 10 ? true : false;

    if (this.plusTen) {
      this.qtyInput = this.productInCart.quantity;
    }

    this.quantityArray = Array.from({ length: this.productInCart.product.quantity > 10 ? 9 : this.productInCart.product.quantity }, (_, index) => index);

  }

  removeFromCart(): void {
    this.userService.removeFromCart(this.productInCart.product.uniCode, this.productInCart.quantity).subscribe(res => {
      window.location.reload();
    });
  }

  change(event: any) {
    if (event.target.value == "10+") {
      this.plusTen = true;
      this.qtyInput = undefined;
    } else if (this.qtyInput! <= 9) {
      this.plusTen = false;
      this.qtySelect.setValue(this.qtyInput!);
    }

    const selectedValue = this.plusTen ? this.qtyInput : (this.qtySelect.value !== null ? this.qtySelect.value : 9);

    if (selectedValue != null && selectedValue != undefined) {
      this.userService.updateProductInCart(this.productInCart.product.uniCode, selectedValue).subscribe(res => {
        this.sharedService.sendClickEvent("updateTotalPrice");
        window.location.reload();
      });
    }
  }

}

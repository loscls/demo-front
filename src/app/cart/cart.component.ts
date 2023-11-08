import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ProductInCart } from '../dTypes';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{

  productInCart: ProductInCart[] = []
  totalPrice: number = 0;

  constructor(private userService: UserService, private sharedService: SharedService) {

    this.sharedService.getClickEvent().subscribe((value) => {
      if (value == 'updateTotalPrice') {
        this.userService.getTotalPrice().subscribe(res => {
          this.totalPrice = res;
        })
      }
    })

  }

  ngOnInit(): void {
    this.userService.getCart().subscribe(res => {
      this.productInCart = res;
    })

    this.userService.getTotalPrice().subscribe(res => {
      this.totalPrice = res;
    })
  }

  buyAll(): void {
    this.productInCart.forEach(pIC => {
      this.userService.buyProduct(pIC.product.uniCode, pIC.quantity).subscribe(res => {
          return res;
        });
        window.location.reload();
    });
  }


}

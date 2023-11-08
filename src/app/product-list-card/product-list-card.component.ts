import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../dTypes';

@Component({
  selector: 'app-product-list-card',
  templateUrl: './product-list-card.component.html',
  styleUrls: ['./product-list-card.component.css']
})
export class ProductListCardComponent implements OnInit {

  @Input()
  product!: Product;

  constructor(private productService:ProductService) {}


  ngOnInit(): void {}

  delete():void {
    this.productService.removeProduct(this.product.uniCode).subscribe( res => {
      window.location.reload();
    });
  }

}

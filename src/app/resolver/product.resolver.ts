import { Injectable } from '@angular/core';
import { ProductService } from '../services/product.service';

@Injectable({
  providedIn: 'root'
})

export class productResolver {
  constructor(private productService:ProductService) {}

  resolve() {
    let param = { } //

    return this.productService.getAll();
  }

}

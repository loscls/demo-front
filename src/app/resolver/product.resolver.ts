import { Injectable } from '@angular/core';
import { ProductService } from '../services/product.service';

@Injectable({
  providedIn: 'root'
})

export class productResolver {
  constructor(private productServie:ProductService) {}

  resolve() {
    let param = { } //

    return this.productServie.getAll();
  }

}

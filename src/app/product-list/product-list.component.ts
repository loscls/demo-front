import { Component, OnInit } from '@angular/core';
import { Product } from '../dTypes';
import { ProductService } from '../services/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  addProductForm:FormGroup;

  addForm: boolean = false;

  searchTerm: string = "";

  productList: Product[] = [];

  pgNumber: number = 0;
  pgSize: number = 5;
  length: number | undefined;
  firstPage: boolean | undefined;
  lastPage: boolean | undefined;

  constructor(private productService:ProductService, private formBuilder:FormBuilder) {

    this.addProductForm = this.formBuilder.group({
      name:["", [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)]],
      brand:["", [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)]],
      quantity:["", [Validators.required, Validators.pattern(/^[1-9]\d*$/)]],
      uniCode:["", [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)]],
      price:["", [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]]
    })

  }


  ngOnInit(): void {

    this.productService.getPage(this.pgNumber, this.pgSize).subscribe(res => {
      this.length = res.totalElements;
      this.productList = res.content;

      if (res.first) {
        this.firstPage = true;
        this. lastPage = false;
      } else if(res.last == true) {
        this.firstPage = false;
        this. lastPage = true;
      }
    })
  }

  activateForm() {
    if (this.addForm == false) {
    this.addForm = true;
    } else {
      this.addForm = false;
    }
  }

  addProduct(): void {
    if (this.addProductForm.valid) {
      this.productService.addProduct(this.addProductForm.value).subscribe(res => {})
      this.addForm = false;
    }
  }


  pageForward(): void {
    this.pgNumber = this.pgNumber + 1;

    this.productService.getPage(this.pgNumber, this.pgSize).subscribe(res => {
      this.productList = res.content;

      if (res.first) {
        this.firstPage = true;
        this. lastPage = false;
      } else if(res.last == true) {
        this.firstPage = false;
        this. lastPage = true;
      }
    })

  }

  pageBack(): void {
    this.pgNumber = this.pgNumber - 1;

    this.productService.getPage(this.pgNumber, this.pgSize).subscribe(res => {
      this.productList = res.content;

      if (res.first) {
        this.firstPage = true;
        this. lastPage = false;
      } else if(res.last == true) {
        this.firstPage = false;
        this. lastPage = true;
      }
    })
  }
}

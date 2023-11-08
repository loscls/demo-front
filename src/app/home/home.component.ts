import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product, Paging } from '../dTypes';
import { ProductService } from '../services/product.service';
import { PageEvent } from '@angular/material/paginator';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  searchTerm: string = "";
  inSearch: boolean = false;

  pgNumber: number = 0;
  pgSize: number = 8;
  length: number | undefined;
  paging: Paging | undefined;

  public list: Product[] = [];

  // ESEMPIO DI RESOLVE

  // constructor(private route:ActivatedRoute) {
  //   this.route.data.subscribe(res => {
  //     this.list = res?.['data'];
  //   })
  // }

  constructor(private productService:ProductService) {}

  ngOnInit() :void {

    this.productService.getPage(this.pgNumber, this.pgSize).subscribe(res => {
      this.length = res.totalElements;
      this.list = res.content;
      this.paging = res
    })

  }

  // ESEMPIO MAT PAGINATOR
  // changePageEvent(pageEvent: PageEvent) {
  //   this.pgSize = pageEvent.pageSize;
  //   this.pgNumber = pageEvent.pageIndex;


  //   this.productService.getPage(this.pgNumber, this.pgSize).subscribe(res => {
  //     this.list = res.content;
  //   });

  // }


  pageForward(): void {
    this.pgNumber = this.pgNumber + 1;

    this.productService.getPage(this.pgNumber, this.pgSize).subscribe(res => {
      this.list = res.content;
    })

  }

  pageBack(): void {
    this.pgNumber = this.pgNumber - 1;

    this.productService.getPage(this.pgNumber, this.pgSize).subscribe(res => {
      this.list = res.content;
    })

  }


  search(): void {
    if(this.searchTerm != null && this.searchTerm != "") {
      this.productService.getProductBySearchTerm(this.searchTerm).subscribe(res => {
        this.list = res;
        this.inSearch = true;
        this.searchTerm = "";
      });
    } else {
      this.productService.getPage(this.pgNumber, this.pgSize).subscribe(res => {
        this.length = res.totalElements;
        this.list = res.content;
        this.paging = res
        this.inSearch = false;
        this.searchTerm = "";
      })
    }
  }

}

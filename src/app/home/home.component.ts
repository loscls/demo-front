import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../dTypes';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  public list: Product[] = [];

  constructor(private route:ActivatedRoute) {
    this.route.data.subscribe(res => {
      console.log(res);
      this.list = res?.['data'];

      console.log(this.list);
    })
  }



}

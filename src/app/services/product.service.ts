import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Product, Paging } from '../dTypes';
import { Observable } from 'rxjs';
import { API } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private apiService:ApiService) { }

  getAll(): Observable<Product[]> {

    let result = this.apiService.makeRequest("get", API.product+API.getAll);

    return result;
  }

  getPage(pgNumber: number, pgSize: number): Observable<Paging> {

    let params = {"pgNumber": pgNumber, "pgSize": pgSize};

    let result = this.apiService.makeRequest("get", API.product+API.getPage, null, params);

    return result
  }

  removeProduct(unicode:string): Observable<void> {

    let params = {"unicode":unicode};

    return this.apiService.makeRequest("delete", API.product+API.removeProduct, null, params);

  }

  addProduct(data: object): Observable<Product> {

    return this.apiService.makeRequest("post", API.product+API.addProduct, data);

  }

  getProductBySearchTerm(searchTerm: String): Observable<Product[]> {

    let params = {"searchTerm":searchTerm};

    return this.apiService.makeRequest("get", API.product+API.getSearch, null, params)

  }
}

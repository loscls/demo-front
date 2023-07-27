import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Product } from '../dTypes';
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

}

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from '../constants';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  makeRequest(type:string, url:string, body?:any, params?:any): Observable<any>{
    url = API.originUrl + url;

    let options = {};

    if(params) {
      let httpParams = new HttpParams();

      Object.keys(params).forEach((key)=>{
        httpParams = httpParams.append(key, params[key])
      });

      options = {params: httpParams}
    }

    if(localStorage.getItem('User')) {
      let seller = JSON.parse(localStorage.getItem('User')!);

      localStorage.setItem('token', seller['token']);

      let httpHeader  = new HttpHeaders();
      httpHeader = httpHeader.append('Authorization', "Bearer " + localStorage.getItem('token'));

      options = {...options, headers: httpHeader};

    }

    if(body) {
      options = {...options};

      if(type.toLocaleLowerCase() == "post") {
        return this.http.post(url, body, options);
      } else if (type.toLocaleLowerCase() == "put") {
        return this.http.put(url, body, options);
      }
    }

    if(type.toLocaleLowerCase() == "delete") {
      return this.http.delete(url, options);
    }

    return this.http.get(url, options);

  }
}

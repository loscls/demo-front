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
    console.log(url);

    let options = {};

    if(params) {
      let httpParams = new HttpParams();

      Object.keys(params).forEach((key)=>{
        httpParams = httpParams.append(key, params[key])
      });

      options = {params: httpParams}
    }

    if(localStorage.getItem('seller')) {
      // let seller = localStorage.getItem('seller');
      // seller = JSON.parse(seller!);
      // console.log(seller!.token);

      let seller = JSON.parse(localStorage.getItem('seller')!);
      console.log(seller['token']);

      localStorage.setItem('token', seller['token']);

      let httpHeader  = new HttpHeaders();
      httpHeader = httpHeader.append('Authorization', "Bearer " + localStorage.getItem('token'));

      options = {...options, headers: httpHeader};

    }

    if(body) {
      options = {...options, body}

      if(type.toLocaleLowerCase() == "post") {
        return this.http.post(url, body);
      } else if (type.toLocaleLowerCase() == "put") {
        return this.http.put(url, body);
      }

    //ha senso passare un body nelle option se già gli possiamo passare un body dal metodo ??????
    }

    //allo stesso modo in option potrei inserire un header httpHeader con dentro un bearer Token

    if(type.toLocaleLowerCase() == "delete") {
      return this.http.delete(url, options);
    }

    return this.http.get(url, options);

  }
}

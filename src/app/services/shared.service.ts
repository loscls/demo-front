import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  private subject=new Subject<any>();

  sendClickEvent(params:any){
    this.subject.next(params);
  }
  getClickEvent():Observable<any>{
    return this.subject.asObservable();
  }
}

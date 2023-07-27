import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { API } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private apiService:ApiService, private router:Router) { }

  isSellerLogged = new BehaviorSubject<boolean>(false);
  //aggiungi controllo admin o no isAdimin = new BehaviorSubject<boolean>(false);
  //nel signUp e nel logIn controllare se admin o no e reindirizzare verso la corretta pagina
  //PROBLEMA come salvare nel localstorage se admin o no, token

  signUp(data: object): void{

    //questa è la richiesta http che andremo a fare al db, sarà una post all'endpoint auth/registration
    let result = this.apiService.makeRequest("post", API.auth+API.registration, data);

    result.subscribe((response)=>{
      //CONTROLLI ????

      //localStorage salva i dati dell'utente che si è registrato e mantenuti in locale tra le sessioni o le pagine del sito web senza dover fare richieste al server ogni volta.
      localStorage.setItem('seller', JSON.stringify(response))
      this.isSellerLogged.next(true);
      this.router.navigate(['seller-home']);

    });

    // .subscribe
    //le richieste sul web sono ASINCRONE, non bloccano l'esecuzione del codice durante l'attesa della risposta del server
    //vengono inviate al server in background e il flusso di esecuzione del programma continua senza attendere la risposta.
    //Per questo si usa la funzione .subscribe che è un observable con una o più funzioni di callback che verranno eseguite alla risposta del server.

    console.log(result);
  }

  reloadSeller(): void {
    if(localStorage.getItem('seller')) {
      this.isSellerLogged.next(true);
      this.router.navigate(['seller-home']);
    }
  }

  logIn(data: Object): void {

    let result = this.apiService.makeRequest("post", API.auth+API.authenticate, data);

    result.subscribe((response)=>{
      //CONTROLLI ????

      localStorage.setItem('seller', JSON.stringify(response))
      this.isSellerLogged.next(true);
      this.router.navigate(['']);

      console.log(response);

    });

  }
}

// src/app/_benvenuto/login/_login_service/auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Auth } from 'src/app/_type/auth.type';
import { StatoSessioneClientService } from 'src/app/_servizi_globali/stato-sessione-client.service';

@Injectable({
  providedIn: 'root',
})
export class Authservice {
  static auth: Auth;
  private obsAuth$: BehaviorSubject<Auth>;
  chiaveAuth = 'auth';

  constructor(
    private statoSessione: StatoSessioneClientService
  ) {
    Authservice.auth = this.leggiAuthDaStorage();
    this.obsAuth$ = new BehaviorSubject<Auth>(Authservice.auth);
  }

  leggiObsAuth() {
    return this.obsAuth$;
  }

  settaObsAuth(dati: Auth) {
    Authservice.auth = dati;
    this.obsAuth$.next(dati);
  }



     scriviAuth(auth: Auth, restaCollegato: boolean): void {
     const tmp: string = JSON.stringify(auth);

     // pulisco sempre l'altro storage per evitare doppi "auth"
     localStorage.removeItem(this.chiaveAuth);
     sessionStorage.removeItem(this.chiaveAuth);

     if (restaCollegato) {
       localStorage.setItem(this.chiaveAuth, tmp);
     } else {
       sessionStorage.setItem(this.chiaveAuth, tmp);
     }
   }

 // DOPO
logout(consideraSessioneGiaVerificata: boolean = true): void {
  const authVuoto: Auth = {
    idUtente: null,
    idRuolo: null,
    idStato: null,
    tk: null,
    nome: null,
    abilita: null,
  };
  this.settaObsAuth(authVuoto);
     localStorage.removeItem(this.chiaveAuth);
   sessionStorage.removeItem(this.chiaveAuth);

  // reset stato client (nuova "istanza logica")
  this.statoSessione.reset(consideraSessioneGiaVerificata);
}

 leggiAuthDaStorage(): Auth {
   const tmpSessione: string | null = sessionStorage.getItem(this.chiaveAuth);
   const tmpLocale: string | null = localStorage.getItem(this.chiaveAuth);

   const tmp = tmpSessione ?? tmpLocale;

   let auth: Auth;
   if (tmp != null) {
     auth = JSON.parse(tmp);
   } else {
     auth = {
       idUtente: null,
       idRuolo: null,
       idStato: null,
       tk: null,
       nome: null,
       abilita: null,
     };
   }
   return auth;
 }
}

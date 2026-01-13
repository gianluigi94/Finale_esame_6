<<<<<<< HEAD
// src/app/_benvenuto/login/_login_service/auth.service.ts
=======
// Servizio Angular che gestisce lo stato di autenticazione dell'utente: lo legge/salva su localStorage e lo espone in modo reattivo tramite BehaviorSubject. Fornisce metodi per aggiornare l'auth globale e per eseguire il logout, resettando anche lo stato della sessione lato client. Si inizia a ragionare anche sul fatto se si è gia verificata la sessione, utile per ui.

>>>>>>> 35cb057 (metà commenti)
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Auth } from 'src/app/_type/auth.type';
import { StatoSessioneClientService } from 'src/app/_servizi_globali/stato-sessione-client.service';

<<<<<<< HEAD
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
=======
@Injectable({ providedIn: 'root'}) // Registro il servizio nel root injector
export class Authservice {
  static auth: Auth;
  private obsAuth$: BehaviorSubject<Auth>;

  constructor(private statoSessione: StatoSessioneClientService) {
    Authservice.auth = this.leggiAuthDaStorage(); // inizializzo lo stato statico leggendo l'autenticazione salvata (local o session)
    this.obsAuth$ = new BehaviorSubject<Auth>(Authservice.auth); // creo il comportamento reattivo partendo dal valore letto
  }

  /**
 * Restituisce il BehaviorSubject che contiene lo stato di autenticazione corrente,
 * così che componenti/servizi possano “ascoltare” i cambiamenti in modo reattivo.
 *
 *
 * @returns BehaviorSubject<Auth>
 *  Oggetto reattivo che emette sempre l’ultimo valore di Auth e i successivi aggiornamenti.
 */
  leggiObsAuth() { // l'observable che permettere agli altri componenti di ascoltare lo stato di autenticazione
    return this.obsAuth$; // restituisco il BehaviorSubject
  }

  /**
 * Aggiorna lo stato di autenticazione globale in memoria e notifica subito tutti gli ascoltatori.
 * - Aggiorna anche la copia statica Authservice.auth
 * - Emette il nuovo valore sul BehaviorSubject
 *
 * @param dati Auth
 *  Nuovo stato di autenticazione da impostare (es. dopo login o reset).
 *
 * @returns void
 */
  settaObsAuth(dati: Auth) {  // aggiorno lo stato di autenticazione in memoria e lo notifico a tutti gli ascoltatori
    Authservice.auth = dati; // salvo i dati anche nel campo statico per avere una copia condivisa
    this.obsAuth$.next(dati); // emetto il nuovo valore così tutta l'app si aggiorna
  }

/**
 * Salva (serializza) lo stato di autenticazione nel salvataggio locale (localStorage),
 * sotto la chiave "auth".
 *
 * @param auth Auth
 *  Oggetto Auth da salvare (verrà convertito in JSON).
 *
 * @returns void
 */
    leggiAuthDaStorage(): Auth {
    // priorita': localStorage (collegato) -> sessionStorage (non collegato)
    const tmpLocal: string | null = localStorage.getItem('auth');
    const tmpSession: string | null = sessionStorage.getItem('auth');
    const tmp: string | null = tmpLocal ?? tmpSession;
    let auth: Auth; // dichiaro la variabile che conterrà l'oggetto Auth finale
    if (tmp != null) { // controllo se ho trovato qualcosa nel salvataggio locale
      auth = JSON.parse(tmp); // converto la stringa JSON nell'oggetto Auth
    } else { // se non ho nessun dato salvato...
      auth = { // creo un oggetto Auth 'vuoto'
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

  scriviAuthSuStorage(auth: Auth, restaCollegato: boolean): void { // salvo lo stato di autenticazione nello storage corretto
    const tmp: string = JSON.stringify(auth); // converto l'oggetto Auth in una stringa JSON
        if (restaCollegato) {
      localStorage.setItem('auth', tmp);
      sessionStorage.removeItem('auth'); // evito conflitti
    } else {
      sessionStorage.setItem('auth', tmp);
      localStorage.removeItem('auth'); // evito conflitti
    }
  }

  logout(consideraSessioneGiaVerificata: boolean = true): void { // eseguo il logout locale e resetto lo stato di sessione client
    const authVuoto: Auth = { // preparo un oggetto Auth 'vuoto' per azzerare l'autenticazione
      idUtente: null,
      idRuolo: null,
      idStato: null,
      tk: null,
      nome: null,
      abilita: null,
    };
    this.settaObsAuth(authVuoto); // aggiorno lo stato globale segnando che non sono più autenticato
    localStorage.removeItem('auth'); // pulisco entrambi
    sessionStorage.removeItem('auth');

    this.statoSessione.reset(consideraSessioneGiaVerificata); // resetto lo stato di sessione lato client tenendo conto del flag passato ( se false non è verificata e la pagina di caricamento sarà finche non aviene una chiamata api valida)
  }
>>>>>>> 35cb057 (metà commenti)
}

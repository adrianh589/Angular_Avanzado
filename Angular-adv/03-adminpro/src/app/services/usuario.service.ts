import { Injectable, NgZone, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RegisterForm} from '../interfaces/register-form.interface';
import {environment} from '../../environments/environment';
import {AutenticacionForm} from '../interfaces/autenticacion-form.interface';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

/**
 * NOTA: Los servicios en angular son singleton es decir que se ejecutan/instancian una unica vez
 */

const base_url = environment.base_url;
declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService{

  public auth2: any;

  constructor( private http: HttpClient,
               private router: Router,
               private ngZone: NgZone) {// ngZone funciona para que redireccionemos de manera correcta debido a que aqui hay librerias de terceros que lo redireccionan, en este caso la libreria de Google
    this.googleInit();
  }

  googleInit(){
    // A diferencia de los observables, las promesas siempre se ejecutan y los observables
    // tiene que alguien estar escuchando
    return new Promise((resolve: any) =>{
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '841187624216-gefatvlfb1bine9dqlsq46hn4fr3u3lj.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
        resolve();
      });
    });
  }

  logouth(){
    localStorage.removeItem('token');
    
    this.auth2.signOut().then( () => {
      this.ngZone.run(() =>{
        this.router.navigateByUrl('/login');
      });
    });

  }

  validarToken(): Observable<boolean>{
    const token = localStorage.getItem('token') || '';

    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        "x-token": token
      }
    }).pipe( 
      tap( (resp: any) => {
        localStorage.setItem('token', resp.token)
      }),
      map( resp => true),
      catchError(error => of(false))// of sirve para retornar un observable y de esa manera no romper el ciclo
    )

  }

  crearUsuario( formData: RegisterForm ){
    return this.http.post(`${base_url}/usuarios`, formData)
    .pipe( tap( (resp: any) => { // Tap sirve para disparar un efecto secundario
      localStorage.setItem('token', resp.token)
    } 
     ));
  }

  autenticarUsuario( formData: AutenticacionForm){
    return this.http.post(`${base_url}/login`, formData)
    .pipe( tap( (resp: any) => { // Tap sirve para disparar un efecto secundario
      localStorage.setItem('token', resp.token)
    } 
     ));
  }

  loginGoogle( token: AutenticacionForm){
    return this.http.post(`${base_url}/login/google`, { token })
    .pipe( tap( (resp: any) => { // Tap sirve para disparar un efecto secundario
      localStorage.setItem('token', resp.token)
    } 
     ));
  }
}

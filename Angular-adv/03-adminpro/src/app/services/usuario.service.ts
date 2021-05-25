import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

import { environment } from '../../environments/environment';

import { RegisterForm } from '../interfaces/register-form.interface';
import { AutenticacionForm } from '../interfaces/autenticacion-form.interface';
import { CargarUsuario } from '../interfaces/cargar-usuarios.interface';

import { Usuario } from '../models/usuario.model';

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
  public usuario!: Usuario;

  constructor(private http: HttpClient,
              private router: Router,
              // tslint:disable-next-line:max-line-length
              private ngZone: NgZone) {// ngZone funciona para que redireccionemos de manera correcta debido a que aqui hay librerias de terceros que lo redireccionan, en este caso la libreria de Google
    this.googleInit();
  }

  // @ts-ignore
  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    };
  }

  get token() {
    return localStorage.getItem('token') || '';
  }

  get uid(): string {
    return this.usuario.uid || '';
  }

  googleInit() {
    // A diferencia de los observables, las promesas siempre se ejecutan y los observables
    // tiene que alguien estar escuchando
    return new Promise((resolve: any) => {
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
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      });
    });

  }

  validarToken(): Observable<boolean> {

    return this.http.get(`${base_url}/login/renew`, this.headers)
      .pipe(
        map((resp: any) => {

          const {nombre, email, google, role, uid, img = ''} = resp.usuario;
          this.usuario = new Usuario(nombre, email, '', img, google, role, uid);
          localStorage.setItem('token', resp.token);
          return true;
        }),
        catchError(error => of(false))
      );

  }

  crearUsuario( formData: RegisterForm ){
    return this.http.post(`${base_url}/usuarios`, formData)
    .pipe( tap( (resp: any) => { // Tap sirve para disparar un efecto secundario
        localStorage.setItem('token', resp.token);
    }
     ));
  }

  actualizarPerfil( data: {email: string, nombre: string, role?: string} ){

    data = {
      ...data,
      role: this.usuario.role
    };

    return this.http.put(`${base_url}/usuarios/${this.uid}`, data, this.headers);
  }

  autenticarUsuario( formData: AutenticacionForm){
    return this.http.post(`${base_url}/login`, formData)
    .pipe( tap( (resp: any) => { // Tap sirve para disparar un efecto secundario
        localStorage.setItem('token', resp.token);
    }
    ));
  }

  loginGoogle(token: AutenticacionForm) {
    return this.http.post(`${base_url}/login/google`, {token})
      .pipe(tap((resp: any) => { // Tap sirve para disparar un efecto secundario
          localStorage.setItem('token', resp.token);
        }
      ));
  }

  cargarUsuarios(desde: number = 0) {
    const url = `${base_url}/usuarios?desde=${desde}`;
    return this.http.get<CargarUsuario>(url, this.headers)
      .pipe(
        // delay(5000),//demora
        map(resp => {
          const usuarios = resp.usuarios.map(user => new Usuario(user.nombre, user.email,
            '', user.img, user.google, user.role, user.uid));
          return {
            total: resp.total,
            usuarios
          };
        })
      );
  }

  eliminarUsuario(usuario: Usuario) {

    const url = `${base_url}/usuarios/${usuario.uid}`;
    return this.http.delete<CargarUsuario>(url, this.headers);
  }

  guardarUsuario(usuario: Usuario) {
    return this.http.put(`${base_url}/usuarios/${usuario.uid}`, usuario, this.headers);
  }
}

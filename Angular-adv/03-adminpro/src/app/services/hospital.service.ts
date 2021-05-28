import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { CargarUsuario } from '../interfaces/cargar-usuarios.interface';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';
import { Hospital } from '../models/hospital.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(private http: HttpClient,
              private router: Router) {
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

  cargarHospitales() {
    const url = `${base_url}/hospitales`;
    return this.http.get(url, this.headers)
      .pipe(
        // @ts-ignore
        map((resp: { ok: boolean, hospitales: Hospital[] }) => resp.hospitales)
      );
  }

  crearHospitales(nombre: string) {
    const url = `${base_url}/hospitales`;
    return this.http.post(url, {nombre}, this.headers);
  }

  // tslint:disable-next-line:variable-name
  actualizarHospitales(_id: string, nombre: string) {
    const url = `${base_url}/hospitales/${_id}`;
    return this.http.put(url, {nombre}, this.headers);
  }

  // tslint:disable-next-line:variable-name
  borrarHospital(_id: string) {
    const url = `${base_url}/hospitales/${_id}`;
    return this.http.delete(url, this.headers);
  }
}

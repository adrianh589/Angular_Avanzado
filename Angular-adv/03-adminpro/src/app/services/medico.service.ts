import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Medico } from '../models/medico.model';
import { map } from 'rxjs/operators';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor(private http: HttpClient,
              private router: Router) { }

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

  obtenerMedicos(){
    const url = `${base_url}/medicos`;
    return this.http.get<{ ok: boolean, medicos: Medico[] }>(url, this.headers)
      .pipe( map( response => response.medicos ) );
  }

  obtenerPorId(id: string){
    const url = `${base_url}/medicos/${id}`;
    return this.http.get<{ok: boolean, medico: Medico}>(url, this.headers)
      .pipe(map( resp => resp.medico));
  }

  crearMedico(medico: {nombre: string, hospital: string}){
    const url = `${base_url}/medicos`;
    return this.http.post( url, medico, this.headers );
  }

  // tslint:disable-next-line:variable-name
  actualizarMedico(medico: Medico){
    const url = `${base_url}/medicos/${medico._id}`;
    return this.http.put(url, medico, this.headers);
  }

  // tslint:disable-next-line:variable-name
  borrarMedico(_id: string = ''){
    const url = `${base_url}/medicos/${_id}`;
    return this.http.delete(url, this.headers);
  }
}

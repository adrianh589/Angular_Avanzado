import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor( private http: HttpClient) { }

  obtenerUsuarios(): Observable<any>{
    const params = new HttpParams().append('page', '2')
      .append('nombre', 'Adrian');

    return this.http.get('https://reqres12.in/api/user', {
      params
   }).pipe(
     map( (resp: any) => resp.data)
    );
  }



}

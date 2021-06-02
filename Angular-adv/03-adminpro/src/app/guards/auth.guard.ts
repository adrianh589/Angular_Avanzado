import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanLoad, Route, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor( private usuarioService: UsuarioService,
               private router: Router ){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){

      return this.usuarioService.validarToken().pipe(
        tap( estaAutenticado =>  {
          if (!estaAutenticado){
            this.router.navigateByUrl('/login');
          }
        })
      );

    // return true;
    // Este true indica que se puede pasar por la ruta en donde se encuentre el guard,
    // si es false entonces bloqueara la ruta
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.usuarioService.validarToken().pipe(
      tap( estaAutenticado =>  {
        if (!estaAutenticado){
          this.router.navigateByUrl('/login');
        }
      })
    );
  }



}

import { Injectable } from '@angular/core';
import { delay } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu = [] as any;

  constructor( private router: Router ) {
  }

  cargarMenu(){
    this.menu = JSON.parse( localStorage.getItem('menu') as string) || [];
    if( this.menu.length === 0 ){
      this.router.navigateByUrl('/login');
    }

  }

   // menu: any = [ // Se comento porque ahora viene desde el bacend
   //   {
   //     titulo: 'Dashboard',
   //     icono: 'mdi mdi-gauge',
   //     submenu: [
   //       {titulo: 'Gráficas', url: 'grafica1'},
   //       {titulo: 'Main', url: '/'},
   //       {titulo: 'ProgressBar', url: 'progress'},
   //       {titulo: 'Promesas', url: 'promesas'},
   //       {titulo: 'Rxjs', url: 'rxjs'}
   //     ]
   //   },
   //   {
   //     titulo: 'Mantenimiento',
   //     icono: 'mdi mdi-folder-lock-open',
   //     submenu: [
   //       {titulo: 'Usuarios', url: 'usuarios'},
   //       {titulo: 'Hospitales', url: 'hospitales'},
   //       {titulo: 'Médicos', url: 'medicos'},
   //     ]
   //   },
   // ];

}

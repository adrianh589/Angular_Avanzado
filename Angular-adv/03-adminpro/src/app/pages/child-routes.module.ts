import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { GraficalComponent } from './grafical/grafical.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { AdminGuard } from '../guards/admin.guard';
import { RouterModule, Routes } from '@angular/router';

const childRoutes: Routes = [

  {path: '', component: DashboardComponent, data: {titulo: 'Dashboard'}},
  {path: 'account-settings', component: AccountSettingsComponent, data: {titulo: 'Ajustes de cuenta'}},
  {path: 'buscar/:termino', component: BusquedaComponent, data: {titulo: 'Búsquedas'}},
  {path: 'grafica1', component: GraficalComponent, data: {titulo: 'Gráfica #1'}},
  {path: 'progress', component: ProgressComponent, data: {titulo: 'Progress Bar'}},
  {path: 'promesas', component: PromesasComponent, data: {titulo: 'Promesas'}},
  {path: 'perfil', component: PerfilComponent, data: {titulo: 'Perfil de usuario'}},
  {path: 'rxjs', component: RxjsComponent, data: {titulo: 'RxJS'}},

  // Mantenimientos
  {path: 'hospitales', component: HospitalesComponent, data: {titulo: 'Mantenimiento de Hospitales'}},
  {path: 'medicos', component: MedicosComponent, data: {titulo: 'Mantenimiento de Medicos'}},
  {path: 'medico/:id', component: MedicoComponent, data: {titulo: 'Mantenimiento de Medicos'}},

  // Rutas de admin
  {path: 'usuarios', canActivate: [AdminGuard], component: UsuariosComponent, data: {titulo: 'Mantenimiento de Usuarios'}},
];


@NgModule({
  imports: [ RouterModule.forChild(childRoutes) ],
  exports: [ RouterModule ]
})
export class ChildRoutesModule { }

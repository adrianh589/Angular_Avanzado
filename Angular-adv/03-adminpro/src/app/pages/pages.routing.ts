import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PagesComponent} from './pages.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ProgressComponent} from './progress/progress.component';
import {GraficalComponent} from './grafical/grafical.component';
import {AccountSettingsComponent} from './account-settings/account-settings.component';
import {PromesasComponent} from './promesas/promesas.component';
import {RxjsComponent} from './rxjs/rxjs.component';
import { AuthGuard } from '../guards/auth.guard';
import { PerfilComponent } from './perfil/perfil.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      {path: '', component: DashboardComponent, data: {titulo: 'Dashboard'}},
      {path: 'account-settings', component: AccountSettingsComponent, data: {titulo: 'Ajustes de cuenta'}},
      {path: 'grafica1', component: GraficalComponent, data: {titulo: 'Gráfica #1'}},
      {path: 'progress', component: ProgressComponent, data: {titulo: 'Progress Bar'}},
      {path: 'promesas', component: PromesasComponent, data: {titulo: 'Promesas'}},
      {path: 'perfil', component: PerfilComponent, data: {titulo: 'Perfil de usuario'}},
      {path: 'rxjs', component: RxjsComponent, data: {titulo: 'RxJS'}},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [],
  declarations: [],
})
export class PagesRoutingModule {
}

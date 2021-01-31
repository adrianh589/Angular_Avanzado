import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PagesComponent} from './pages.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ProgressComponent} from './progress/progress.component';
import {GraficalComponent} from './grafical/grafical.component';
import {AccountSettingsComponent} from './account-settings/account-settings.component';
import {PromesasComponent} from './promesas/promesas.component';
import {RxjsComponent} from './rxjs/rxjs.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    children: [
      {path: '', component: DashboardComponent, data: {titulo: 'Dashboard'}},
      {path: 'progress', component: ProgressComponent, data: {titulo: 'Progress Bar'}},
      {path: 'grafica1', component: GraficalComponent, data: {titulo: 'Gráfica #1'}},
      {path: 'account-settings', component: AccountSettingsComponent, data: {titulo: 'Ajustes de cuenta'}},
      {path: 'promesas', component: PromesasComponent, data: {titulo: 'Promesas'}},
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

import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PagesComponent} from './pages.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ProgressComponent} from './progress/progress.component';
import {GraficalComponent} from './grafical/grafical.component';
import {AccountSettingsComponent} from './account-settings/account-settings.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    children: [
      {path: '', component: DashboardComponent},
      {path: 'progress', component: ProgressComponent},
      {path: 'grafica1', component: GraficalComponent},
      {path: 'account-settings', component: AccountSettingsComponent},
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

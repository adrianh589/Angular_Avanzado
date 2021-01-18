import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Modulos
import {PagesRoutingModule} from './pages/pages.routing';

import {NopagefoundComponent} from './nopagefound/nopagefound.component';
import {AuthRoutingModule} from './auth/auth.routing';

const routes: Routes = [
  // path: '/dashboard' PagesRouting
  // path: '/auth' AuthRouting
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: '**', component: NopagefoundComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    PagesRoutingModule, // Ruta hija -> Queda mejor ordenado hacerlo de esta manera
    AuthRoutingModule   // Ruta hija -> Queda mejor ordenado hacerlo de esta manera
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

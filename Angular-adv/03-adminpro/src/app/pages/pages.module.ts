// Modulos de angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';

// Mis modulos
import {SharedModule} from '../shared/shared.module';
import {AppRoutingModule} from '../app-routing.module';
import {ComponentsModule} from '../components/components.module';

// Componentes
import {ProgressComponent} from './progress/progress.component';
import {GraficalComponent} from './grafical/grafical.component';
import {PagesComponent} from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';

@NgModule({
  declarations: [
    ProgressComponent,
    GraficalComponent,
    PagesComponent,
    AccountSettingsComponent,
    PromesasComponent,
    RxjsComponent,
    PerfilComponent,
  ],
  exports: [
    ProgressComponent,
    GraficalComponent,
    PagesComponent,
    AccountSettingsComponent
  ],
    imports: [
        CommonModule,
        SharedModule,
        AppRoutingModule,
        FormsModule,
        ComponentsModule
    ]
})
export class PagesModule { }

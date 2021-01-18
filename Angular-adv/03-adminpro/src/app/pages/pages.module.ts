import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProgressComponent} from './progress/progress.component';
import {GraficalComponent} from './grafical/grafical.component';
import {PagesComponent} from './pages.component';
import {SharedModule} from '../shared/shared.module';
import {AppRoutingModule} from '../app-routing.module';



@NgModule({
  declarations: [
    ProgressComponent,
    GraficalComponent,
    PagesComponent,
  ],
  exports: [
    ProgressComponent,
    GraficalComponent,
    PagesComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule
  ]
})
export class PagesModule { }

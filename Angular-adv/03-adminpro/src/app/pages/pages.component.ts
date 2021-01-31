import { Component, OnInit } from '@angular/core';
import {SettingsService} from '../services/settings.service';

//Decirle a angular que esta funcion existe porque esta de manera global
declare function customInitFunctions(): void;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  constructor( private settingsService: SettingsService ) {

  }

  ngOnInit(): void {
    customInitFunctions();
  }



}

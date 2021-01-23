import {Component, Input, OnInit} from '@angular/core';
import {MultiDataSet} from 'ng2-charts';

@Component({
  selector: 'app-grafical',
  templateUrl: './grafical.component.html',
  styles: [
  ]
})
export class GraficalComponent implements OnInit {

  public labels1: string[] = ['Xbox One Prueba', 'Play Station 5', 'Nintendo Switch'];
  public data1 = [
    [500, 500, 500],
  ];

  constructor() { }

  ngOnInit(): void {
  }

}

import {Component, Input, OnInit} from '@angular/core';
import {Color, Label, MultiDataSet} from 'ng2-charts';
import {ChartType} from 'chart.js';

@Component({
  selector: 'app-donut',
  templateUrl: './donut.component.html',
  styles: [
  ]
})
export class DonutComponent implements OnInit {

  colors: Color[] = [
    {backgroundColor: ['#3498db', '#E74C3C', '#17202A']}
  ];

  @Input() titulo = 'No title';

  // Doughnut
  @Input('labels') public doughnutChartLabels: Label[] = ['Xbox One', 'Play Station 5', 'Nintendo Switch'];
  @Input('data') public doughnutChartData: MultiDataSet = [
    [350, 450, 100],
  ];
  public doughnutChartType: ChartType = 'doughnut';

  constructor() { }

  ngOnInit(): void {
  }

}

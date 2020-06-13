import { Component, ViewChild } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Label, Color, BaseChartDirective } from 'ng2-charts';
import { DataSet } from './dataSet';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'stat-etudiant';
  @ViewChild("baseChart") chart: BaseChartDirective;
  somme: number =0;
  data : DataSet = new DataSet();
  
  listeSection  = ['Informatique', 'Mécanique', 'Chimie', 'Para-médicale', 'Langues'];

  lineChartData: ChartDataSets[] = [
    { data: [0, 0, 0, 0, 0, 0], label: 'Nombre des étudiants ' },
  ];

  lineChartLabels: Label[] = ['Informatique', 'Mécanique', 'Chimie', 'Para-médicale', 'Langues'];

  lineChartOptions = {
    responsive: true,
    scales: {
      yAxes: [
          {
              id: 'y-axis-1',
              type: 'linear',
              display: true,
              position: 'left',
              ticks: {
                  beginAtZero: true,
                  stepSize: 1,
                  max: 100
              }
          }
      ]
  }
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';

  constructor() {
    this.data.label = this.listeSection[0];
  }

  onSubmit() {
    if (this.data.data > 0) {
      var indexOfDate = this.lineChartLabels.indexOf(this.data.label);
      var dataOfIndex = +this.lineChartData[0].data[indexOfDate];
      this.somme = this.somme + this.data.data;
      this.lineChartData[0].data[indexOfDate] = dataOfIndex + this.data.data;
      this.updateChart();
    }


  }

  updateChart() {
    if (this.chart !== undefined) {
      this.chart.ngOnDestroy();
      this.chart.chart = this.chart.getChartBuilder(this.chart.ctx);
    }
  }
}

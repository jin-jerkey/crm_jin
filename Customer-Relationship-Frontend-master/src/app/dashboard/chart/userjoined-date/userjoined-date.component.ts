
import { Component, Input, SimpleChanges } from '@angular/core';
import { ChartOptions } from 'chart.js';
@Component({
  selector: 'app-userjoined-date',
  templateUrl: './userjoined-date.component.html',
  styleUrls: ['./userjoined-date.component.css']
})
export class UserjoinedDateComponent {


    @Input() joinedYearNumber!: any[];
    barChartOptions: ChartOptions = {
      responsive: false,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: (value) => (Number.isInteger(value) ? value : ''),
          },
        },
      },
    };
  
    chartData: any;
  
    ngOnChanges(changes: SimpleChanges): void {
      if (changes['joinedYearNumber'] && this.joinedYearNumber) {
        this.updateChart();
      }
    }
    
    private updateChart(): void {
      const labels = this.joinedYearNumber.map((item) => item.year);
      const data = this.joinedYearNumber.map((item) => item.clientCount);
    
      const borderWidth = 2;
    
      this.chartData = {
        labels: labels,
        datasets: [
          {
            label: 'Nombre de clients',
            data: data,
            borderWidth: borderWidth,
          },
        ],
      };
    }
  }
  
import { Component, Input, SimpleChanges } from '@angular/core';
import { ChartOptions } from 'chart.js';

@Component({
  selector: 'app-donot-user-stats',
  templateUrl: './donot-user-stats.component.html',
  styleUrls: ['./donot-user-stats.component.css']
})
export class DonotUserStatsComponent {

    @Input() employeeCount: number = 0;
    @Input() clientCount: number = 0;
    @Input() adminCount: number = 0;
  
    doughnutChartOptions: ChartOptions = {
      responsive: false,
    };
  
    chartData: any;
  
    public doughnutChartLabels: string[] = ['Employees', 'Clients', 'Admins'];
    public doughnutChartData: number[] = [];
    public doughnutChartType: string = 'doughnut';
  
    ngOnInit(): void {
      this.updateChartData();
    }
  
    ngOnChanges(changes: SimpleChanges): void {
      if (
        (changes['employeeCount'] && this.employeeCount !== undefined) ||
        (changes['clientCount'] && this.clientCount !== undefined) ||
        (changes['adminCount'] && this.adminCount !== undefined)
      ) {
        this.updateChartData();
      }
    }
  
    private updateChartData(): void {
      const doughnutChartData = this.doughnutChartData = [this.employeeCount, this.clientCount, this.adminCount];
  
      const clientColor = 'rgba(0, 123, 255, 0.7)';
      const employeeColor = 'rgba(255, 99, 132, 0.7)';
      const adminColor = 'rgba(255, 206, 86, 0.7)';
      const borderWidth = 6;
  
      this.chartData = {
        labels: this.doughnutChartLabels,
        datasets: [
          {
            data: doughnutChartData,
            backgroundColor: [employeeColor, clientColor, adminColor],
            borderWidth: borderWidth,
          },
        ],
      };
    }
  }
  
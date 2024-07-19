import { Component, Input } from '@angular/core';
import { ChartOptions } from 'chart.js';
@Component({
  selector: 'app-userbyid-barchart',
  templateUrl: './userbyid-barchart.component.html',
  styleUrls: ['./userbyid-barchart.component.css']
})
export class UserbyidBarchartComponent {
  @Input() commandsData!: any[];

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

  constructor() {}

  ngOnInit(): void {
    if (this.commandsData) {
      // Initialize an object to store total commands per year
      const totalCommandsPerYear: {[key: string]: number} = {};
  
      // Iterate over each command
      this.commandsData.forEach((command) => {
        const dateCommand = new Date(command.dateCommand);
        const year = dateCommand.getFullYear().toString(); // Extract year from dateCommand
  
        // Increment total commands for the corresponding year
        totalCommandsPerYear[year] = (totalCommandsPerYear[year] || 0) + 1;
      });
  
      // Extract labels and data from the calculated totalCommandsPerYear object
      const labels = Object.keys(totalCommandsPerYear);
      const data = Object.values(totalCommandsPerYear);
  
      const borderWidth = 2;
  
      this.chartData = {
        labels: labels,
        datasets: [
          {
            label: 'Total des commandes par an',
            data: data,
            borderWidth: borderWidth,
          },
        ],
      };
    }
  }
  
}
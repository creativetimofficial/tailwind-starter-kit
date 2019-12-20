import { Component, OnInit, AfterViewInit } from '@angular/core';
import Chart from "chart.js";

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html'
})
export class BarChartComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit() {
  }
  ngAfterViewInit(){
    let config = {
      type: "bar",
      data: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July"
        ],
        datasets: [
          {
            label: new Date().getFullYear(),
            backgroundColor: "#48bb78",
            borderColor: "#48bb78",
            data: [10, 78, 56, 34, 100, 45, 13],
            fill: false
          },
          {
            label: new Date().getFullYear() - 1,
            fill: false,
            backgroundColor: "#ed8936",
            borderColor: "#ed8936",
            data: [7, 68, 86, 74, 10, 4, 87]
          }
        ]
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: true,
          text: "Orders Chart"
        },
        tooltips: {
          mode: "index",
          intersect: false
        },
        hover: {
          mode: "nearest",
          intersect: true
        },
        scales: {
          xAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: "Month"
              },
              gridLines: {
                borderDash: [2],
                borderDashOffset: [2],
                color: "rgba(33, 37, 41, 0.3)",
                zeroLineColor: "rgba(33, 37, 41, 0.3)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2]
              }
            }
          ],
          yAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: "Value"
              },
              gridLines: {
                borderDash: [2],
                borderDashOffset: [2],
                color: "rgba(33, 37, 41, 0.3)",
                zeroLineColor: "rgba(33, 37, 41, 0.3)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2]
              }
            }
          ]
        }
      }
    };
    let ctx:any = document.getElementById("bar-chart");
    ctx = ctx.getContext("2d");
    new Chart(ctx, config);
  }

}

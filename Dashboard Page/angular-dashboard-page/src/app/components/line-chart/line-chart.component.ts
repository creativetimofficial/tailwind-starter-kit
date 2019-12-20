import { Component, OnInit, AfterViewInit } from '@angular/core';
import Chart from "chart.js";

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html'
})
export class LineChartComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    var config = {
      type: "line",
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
            backgroundColor: "#4c51bf",
            borderColor: "#4c51bf",
            data: [10, 78, 56, 34, 100, 45, 13],
            fill: false
          },
          {
            label: new Date().getFullYear() - 1,
            fill: false,
            backgroundColor: "#b7791f",
            borderColor: "#b7791f",
            data: [7, 68, 86, 74, 10, 4, 87]
          }
        ]
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: true,
          text: "Sales Charts",
          fontColor: "white"
        },
        legend: {
          labels: {
            fontColor: "white"
          }
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
              ticks: {
                fontColor: "white"
              },
              display: true,
              scaleLabel: {
                display: true,
                labelString: "Month",
                fontColor: "white"
              },
              gridLines: {
                borderDash: [2],
                borderDashOffset: [2],
                color: "rgba(33, 37, 41, 0.3)",
                zeroLineColor: "rgba(33, 37, 41, 0.1)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2]
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                fontColor: "white"
              },
              display: true,
              scaleLabel: {
                display: true,
                labelString: "Value",
                fontColor: "white"
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
    let ctx:any = document.getElementById("line-chart") as HTMLCanvasElement;
    ctx = ctx.getContext("2d");
    new Chart(ctx, config);
  }

}

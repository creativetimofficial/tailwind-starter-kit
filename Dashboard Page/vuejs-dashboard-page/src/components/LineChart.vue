<template>
  <div class="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
    <div
      class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-indigo-900"
    >
      <div class="rounded-t mb-0 px-4 py-3 bg-transparent">
        <div class="flex flex-wrap items-center">
          <div class="relative w-full px-4 max-w-full flex-grow flex-1">
            <h6 class="uppercase text-gray-200 mb-1 text-xs font-semibold">
              Overview
            </h6>
            <h2 class="text-white text-xl font-semibold">
              Sales value
            </h2>
          </div>
        </div>
      </div>
      <div class="px-4 py-5 flex-auto">
        <!-- Chart -->
        <div class="relative" style="height:350px">
          <canvas id="line-chart"></canvas>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Chart from "chart.js";

export default {
  mounted: function() {
    this.$nextTick(function() {
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
      var ctx = document.getElementById("line-chart").getContext("2d");
      window.myLine = new Chart(ctx, config);
    });
  }
};
</script>

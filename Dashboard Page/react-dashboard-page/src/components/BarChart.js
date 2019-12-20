import React from "react";
import Chart from "chart.js";

export default function BarChart() {
  React.useEffect(() => {
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
    let ctx = document.getElementById("bar-chart").getContext("2d");
    window.myBar = new Chart(ctx, config);
  }, []);
  return (
    <>
      <div className="w-full xl:w-4/12 px-4">
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
          <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                <h6 className="uppercase text-gray-500 mb-1 text-xs font-semibold">
                  Performance
                </h6>
                <h2 className="text-gray-800 text-xl font-semibold">
                  Total orders
                </h2>
              </div>
            </div>
          </div>
          <div className="px-4 py-5 flex-auto">
            {/* Chart */}
            <div className="relative" style={{ height: "350px" }}>
              <canvas id="bar-chart"></canvas>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

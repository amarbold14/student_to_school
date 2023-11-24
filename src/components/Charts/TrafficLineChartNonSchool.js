import downTownTraffic from "assets/traffic_analysis/downtown_traffic.json";
import noneDownTownTraffic from "assets/traffic_analysis/none-downtown_traffic.json";
import trafficHourNone from "assets/traffic_analysis/none-school-day-traffic_hours.json";
import trafficHour from "assets/traffic_analysis/traffic_hours.json";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import React, { useState } from "react";
import { Line } from "react-chartjs-2";
const TrafficLineChartNonSchool = () => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  const d = trafficHour.map((t) => t.value);
  const d1 = trafficHourNone.map((t) => t.value);
  const d2 = downTownTraffic.map((t) => t.value);
  const d3 = noneDownTownTraffic.map((t) => t.value);
  const labels = trafficHour.map((t) =>
    t.time < 10 ? "0" + t.time + ":00" : t.time + ":00"
  );
  const data = {
    labels,
    datasets: [
      {
        label: "Сургуулийн бус өдөр",
        data: d1,
        borderColor: "rgb(185, 242, 1)",
        backgroundColor: "rgba(185, 242, 1, 0.5)",
      },
      {
        label: "Сургуулийн бус өдөр хотын төвөөр",
        data: d3,
        borderColor: "rgb(1, 150, 2)",
        backgroundColor: "rgba(1, 150, 2, 0.5)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: false,
      },

      annotation: {
        annotations: {
          box1: {
            type: 'box',
            xMin: 1,
            xMax: 3,
            yMin: 0,
            yMax: 3,
            backgroundColor: 'rgba(0,255,255,0.15)'
          },
          box2: {
            type: 'box',
            xMin: 7,
            xMax: 9,
            yMin: 0,
            yMax: 3,
            backgroundColor: 'rgba(0,255,255,0.15)'
          },

        }
      }
    },
    interaction: {
      intersect: true,
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
        },
      },
      y: {
        max: 2,
        min: 1,
        display: true,
        title: {
          display: true,
          text: "Түгжрэлийн оноо",
        },
      },
    },
  };
  return (
    <div className={"h-96 w-[750px]"}>
      <Line options={options} data={data} />
    </div>
  );
};

export default TrafficLineChartNonSchool;

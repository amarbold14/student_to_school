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
import annotationPlugin from 'chartjs-plugin-annotation';
import React, { useState } from "react";
import { Line } from "react-chartjs-2";
const TrafficLineChartSchool = () => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
      annotationPlugin
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
        label: "Сургуулийн өдөр",
        data: d,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Сургуулийн өдөр хотын төвөөр",
        data: d2,
        borderColor: "rgb(255, 0, 0)",
        backgroundColor: "rgba(255, 0, 0, 0.5)",
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

export default TrafficLineChartSchool;

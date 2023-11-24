import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import React from "react";
import { Bar } from "react-chartjs-2";

const DistrictLineChart = ({ data, title }) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  const filteredData = data
    .filter((f) => f.properties.student_flow > 0)
    .sort((a, b) => {
      return a.properties.student_flow - b.properties.student_flow;
    });
  const labels = filteredData.map((f) => {
    return f.properties.name;
  });

  const numbers = filteredData.map((f) => {
    return f.properties.student_flow;
  });
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: title,
      },
    },
  };
  const chartData = {
    labels,
    datasets: [
      {
        label: "Сурагчдын тоо",
        data: numbers,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  return (
    <div className={"h-96 w-[750px]"}>
      <Bar options={options} data={chartData} />
    </div>
  );
};

export default DistrictLineChart;

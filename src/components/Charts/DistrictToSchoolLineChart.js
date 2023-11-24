import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import React, { useState } from "react";
import { Bar } from "react-chartjs-2";

const DistrictToSchoolLineChart = ({ data, title, isSchool }) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  const d = data.features.filter((f) => f.properties.student_flow > 10);
  const sortedData = d.sort((a, b) => {
    return +a?.properties?.student_flow - b?.properties?.student_flow;
  });

  let aaa = [];
  sortedData.forEach((d1) => {
    if (d1.properties?.school_type === "Private") {
      aaa.push("#F98AB7");
    } else {
      aaa.push("#88E6FC");
    }
  });
  const labels = sortedData.map((f) => {
    return isSchool ? f?.properties?.School_name : f.properties.name;
  });
  const numbers = sortedData.map((f) => {
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
        backgroundColor: aaa,
      },
    ],
  };
  return (
    <div className={"h-96 w-[750px]"}>
      <Bar options={options} data={chartData} />
    </div>
  );
};

export default DistrictToSchoolLineChart;

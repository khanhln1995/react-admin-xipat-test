import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";

const BarChart = ({ categories }) => {
  // Function to generate random revenue data between 300 and 700
  const generateRandomRevenueData = (length) => {
    return Array.from({ length }, () =>
      Math.floor(Math.random() * (700 - 300 + 1) + 300)
    );
  };

  // State for storing the random revenue data
  const [revenueData, setRevenueData] = useState(
    generateRandomRevenueData(categories.length)
  );

  // Calculate the total revenue
  const totalRevenue = revenueData.reduce((acc, value) => acc + value, 0);

  // State for chart data
  const [chartData, setChartData] = useState({
    series: [
      {
        name: "Revenue",
        data: revenueData, // Data points for the bar chart
      },
    ],
    options: {
      chart: {
        type: "bar", // Define chart type as 'bar'
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false, // Set to true for horizontal bar chart
          columnWidth: "55%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: false, // Disable data labels on bars
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      title: {
        text: "Revenue by Product",
        align: "left",
      },
      subtitle: {
        text: `$${totalRevenue}`,
        align: "left",
        style: {
          fontSize: "24px",
          color: "blue",
        },
      },
      xaxis: {
        categories: categories, // X-axis categories (products)
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return "$ " + val + " thousands";
          },
        },
      },
    },
  });

  // Update revenueData and chartData when categories change
  useEffect(() => {
    const newRevenueData = generateRandomRevenueData(categories.length);
    setRevenueData(newRevenueData); // Update revenue data

    // Update chartData with new revenueData and subtitle
    setChartData((prevData) => ({
      ...prevData,
      series: [
        {
          name: "Revenue",
          data: newRevenueData,
        },
      ],
      options: {
        ...prevData.options,
        xaxis: {
          categories: categories,
        },
        subtitle: {
          text: `$${newRevenueData.reduce((acc, value) => acc + value, 0)}`,
          align: "left",
          style: {
            fontSize: "24px",
            color: "blue",
          },
        },
      },
    }));
  }, [categories]); // Effect will run when categories changes

  return (
    <div className="bg-white p-5 rounded-xl shadow max-w-screen-lg">
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="bar"
        height={350}
        width="100%"
      />
    </div>
  );
};

export default BarChart;

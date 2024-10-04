import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";

const LineChart = ({ categories }) => {
  // Function to generate an array of random numbers between 0 and 100
  const generateRandomData = (length) => {
    return Array.from({ length }, () => Math.floor(Math.random() * 101));
  };

  // State for storing the random subscription data
  const [subscriptionsData, setSubscriptionsData] = useState(
    generateRandomData(categories.length)
  );

  // Calculate the sum of the series data
  const totalSubscription = subscriptionsData.reduce(
    (acc, value) => acc + value,
    0
  );

  // State for storing the chart options and data
  const [chartData, setChartData] = useState({
    series: [
      {
        name: "Sales",
        data: subscriptionsData, // Data points for the line chart
      },
    ],
    options: {
      chart: {
        type: "line", // Define chart type as 'line'
        height: 350,
        zoom: {
          enabled: false,
        },
      },
      stroke: {
        curve: "smooth", // Smooth line
      },
      title: {
        text: "Subscription",
        align: "left",
      },
      subtitle: {
        text: totalSubscription,
        align: "left",
        style: {
          fontSize: "24px",
          color: "blue",
        },
      },
      xaxis: {
        categories: categories, // X-axis categories (months)
      },
    },
  });

  // Update the chart data when categories change
  useEffect(() => {
    const newSubscriptionsData = generateRandomData(categories.length);
    setSubscriptionsData(newSubscriptionsData); // Update subscriptionsData

    // Update the chart data with new subscriptionsData
    setChartData((prevData) => ({
      ...prevData,
      series: [
        {
          name: "Sales",
          data: newSubscriptionsData,
        },
      ],
      options: {
        ...prevData.options,
        xaxis: {
          categories: categories,
        },
        subtitle: {
          text: newSubscriptionsData.reduce((acc, value) => acc + value, 0),
          align: "left",
          style: {
            fontSize: "24px",
            color: "blue",
          },
        },
      },
    }));
  }, [categories]);

  return (
    <div className="bg-white p-5 rounded-xl shadow max-w-screen-lg">
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="line"
        height={350}
      />
    </div>
  );
};

export default LineChart;

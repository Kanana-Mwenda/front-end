import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ departments }) => {
  // Prepare data for the chart
  const data = {
    labels: departments.map(department => department.name), // Department names as labels
    datasets: [
      {
        label: 'Department Locations',
        data: departments.map(department => department.location.length), // Example data (length of location strings)
        backgroundColor: departments.map((_, index) =>
          `rgba(${index * 50 % 255}, ${index * 30 % 255}, ${index * 70 % 255}, 0.7)`
        ), // Generate distinct colors for each bar
        borderColor: departments.map((_, index) =>
          `rgba(${index * 50 % 255}, ${index * 30 % 255}, ${index * 70 % 255}, 1)`
        ),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Departments Overview',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Example Metric', // Customize this for your actual metric
        },
      },
      x: {
        title: {
          display: true,
          text: 'Departments',
        },
      },
    },
  };

  return (
    <div style={{ width: '80%', margin: 'auto' }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;

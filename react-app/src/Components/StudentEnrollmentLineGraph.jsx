import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const StudentEnrollmentLineGraph = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.name),
    datasets: [
      {
        label: 'Enrollment Count',
        data: data.map((item) => item.enrollmentCount),
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Student Enrollment Counts' },
    },
    scales: {
      y: { beginAtZero: true, title: { display: true, text: 'Enrollment Count' } },
      x: { title: { display: true, text: 'Student Names' } },
    },
  };

  return (
    <div style={{ width: '80%', margin: 'auto' }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default StudentEnrollmentLineGraph;
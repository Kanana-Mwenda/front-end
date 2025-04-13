import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DashboardBarGraph = ({ data }) => {
    const chartData = {
        labels: data.map((item) => item.courseTitle),
        datasets: [
            {
                label: 'Enrollments',
                data: data.map((item) => item.enrollmentCount),
                backgroundColor: 'hsla(235, 74.80%, 29.60%, 0.60)',
                borderColor: 'hsl(189, 74.10%, 31.80%)',
                borderWidth: 2,
            },
            {
                label: 'Average Grade',
                data: data.map((item) => item.averageGrade),
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgb(184, 30, 145)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Student Progress Overview' },
        },
        scales: {
            y: { beginAtZero: true, title: { display: true, text: 'Values (Grades and Enrollments)' } },
            x: { title: { display: true, text: 'Courses' } },
        },
    };

    return (
        <div style={{ width: '80%', margin: 'auto' }}>
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default DashboardBarGraph;
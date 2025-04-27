import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function UserRegistrationChart() {
  const users = [
    { id: 1, name: 'John Doe', registered_at: '2024-01-15' },
    { id: 2, name: 'Jane Smith', registered_at: '2024-02-02' },
    { id: 3, name: 'Sam Brown', registered_at: '2024-02-25' },
    { id: 4, name: 'Alice Green', registered_at: '2024-03-10' },
    { id: 5, name: 'Bob White', registered_at: '2024-03-15' },
  ];

  // Proses data untuk hitung jumlah user per bulan
  const userCountPerMonth = users.reduce((acc, user) => {
    const month = new Date(user.registered_at).toLocaleString('default', { month: 'long' });
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {});

  const months = Object.keys(userCountPerMonth);
  const counts = Object.values(userCountPerMonth);

  const data = {
    labels: months,
    datasets: [
      {
        label: 'Jumlah User Terdaftar',
        data: counts,
        backgroundColor: 'rgba(54, 162, 235, 0.7)',
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  return (
    <div style={{ maxWidth: 600, margin: '40px auto' }}>
      <h2>Grafik Pendaftaran User</h2>
      <Bar data={data} options={options} />
    </div>
  );
}

export default UserRegistrationChart;

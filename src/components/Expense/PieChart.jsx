// PieChart.js
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register the chart elements
ChartJS.register(ArcElement, Tooltip, Legend);

// Helper to generate a random RGBA color
const getRandomColor = () => {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return `rgba(${r}, ${g}, ${b}, 1)`;
};

const PieChart = ({label, chart_data}) => {
  const backgroundColors = label.map(() => getRandomColor());
  const borderColors = backgroundColors.map(color => color.replace('0', '1'));


  const data = {
    labels: label,
    datasets: [
      {
        label: 'Rs.',
        data: chart_data,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ width: '500px', margin: '0 auto' }}>
      <h3>Pie Chart Example</h3>
      <Pie data={data} />
    </div>
  );
};

export default PieChart;

import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  BarElement,
  LineElement,
  RadarController,
  PointElement,
} from 'chart.js';
import { Pie, Bar, Line, Radar } from 'react-chartjs-2';
import './DashboardStyles.css'; // Unified styles
import { useTheme } from '@mui/material/styles';

// Register required Chart.js elements
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  BarElement,
  LineElement,
  RadarController, // Ensure RadarController is registered
  PointElement
);

type TaskChartsProps = {
  metrics: {
    priorityCounts: Record<string, number>;
    statusCounts: Record<string, number>;
    progressData: { x: string; y: number }[];
    riskCounts: Record<string, number>;
  };
  chartType: 'status' | 'priority' | 'progress' | 'risk';
};

const TaskCharts: React.FC<TaskChartsProps> = ({ metrics, chartType }) => {
  const theme = useTheme();
  const { priorityCounts, statusCounts, progressData, riskCounts } = metrics;

  // Ensure the risk chart includes a fourth 'Undecided' category
  const fullRiskCounts = { ...riskCounts, Undecided: riskCounts.Undecided || 0 };

  const neonColors = ['#FF00FF', '#00FFFF', '#FF4500', '#32CD32'];

  // Chart data configurations
  const statusChartData = {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        label: 'Task Status Distribution',
        data: Object.values(statusCounts),
        backgroundColor: neonColors.map(color => `${color}AA`),
        borderColor: neonColors,
        borderWidth: 2,
        hoverBackgroundColor: neonColors.map(color => `${color}FF`),
        hoverBorderWidth: 3,
      },
    ],
  };

  const priorityChartData = {
    labels: Object.keys(priorityCounts),
    datasets: [
      {
        label: 'Task Priority',
        data: Object.values(priorityCounts),
        backgroundColor: neonColors.map(color => `${color}AA`),
        borderColor: neonColors,
        borderWidth: 1,
        hoverBackgroundColor: neonColors.map(color => `${color}FF`),
        hoverBorderWidth: 3,
        barThickness: 15,
        borderSkipped: false,
        borderRadius: 4,
        barPercentage: 0.8,
        categoryPercentage: 0.9,
        borderShadowColor: '#222',
        shadowOffsetX: 4,
        shadowOffsetY: 4,
      },
    ],
  };

  const progressChartData = {
    labels: progressData.map((point) => point.x),
    datasets: [
      {
        label: 'Task Progress (%)',
        data: progressData.map((point) => point.y),
        backgroundColor: `${neonColors[0]}AA`,
        borderColor: neonColors[0],
        tension: 0.4,
        pointRadius: 4,
        hoverBorderWidth: 3,
      },
    ],
  };

  const riskChartData = {
    labels: Object.keys(fullRiskCounts),
    datasets: [
      {
        label: 'Risk Levels',
        data: Object.values(fullRiskCounts),
        backgroundColor: `${neonColors[1]}AA`,
        borderColor: neonColors[1],
        pointBackgroundColor: neonColors[1],
        borderWidth: 2,
        pointBorderColor: '#FFFFFF',
        hoverBorderWidth: 3,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#FFFFFF',
          font: { size: 14 }
        },
      },
      tooltip: {
        backgroundColor: '#222',
        bodyColor: '#FFFFFF',
      },
    },
    scales: {
      r: chartType === 'risk' ? { 
        angleLines: { color: '#444' },
        grid: { color: '#444', lineWidth: 0.5 },
        pointLabels: { color: '#FFFFFF' },
        ticks: { display: false },
      } : undefined,
      x: chartType === 'status' ? { display: false } : { grid: { color: '#444' } },
      y: chartType === 'status' ? { display: false } : { grid: { color: '#444' } },
    },
  };

  // Chart rendering logic
  const renderChart = () => {
    switch (chartType) {
      case 'status':
        return <Pie data={statusChartData} options={chartOptions} />;
      case 'priority':
        return <Bar data={priorityChartData} options={chartOptions} />;
      case 'progress':
        return <Line data={progressChartData} options={chartOptions} />;
      case 'risk':
        return <Radar data={riskChartData} options={chartOptions} />;
      default:
        return null;
    }
  };

  return <div className="chart-container" style={{ backgroundColor: '#111', padding: '10px', borderRadius: '10px', boxShadow: '0 0 10px #0ff' }}>{renderChart()}</div>;
};

export default TaskCharts;

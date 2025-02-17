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
import { Doughnut, Bar, Line, Radar } from 'react-chartjs-2';
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
  RadarController,
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
  const fullRiskCounts = { ...riskCounts, Undecided: riskCounts.Undecided || 0 };

  const priorityChartData = {
    labels: Object.keys(priorityCounts),
    datasets: [
      {
        label: 'Task Priority',
        data: Object.values(priorityCounts),
        backgroundColor: Object.keys(priorityCounts).map(
          (_, index) =>
            theme.chartColors[index % theme.chartColors.length] + '33' // Semi-transparent
        ),
        borderColor: Object.keys(priorityCounts).map(
          (_, index) => theme.chartColors[index % theme.chartColors.length]
        ),
        borderWidth: 1,
      },
    ],
  };

  // Doughnut chart data for status
  const statusChartData = {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        label: 'Task Status Distribution',
        data: Object.values(statusCounts),
        backgroundColor: Object.keys(statusCounts).map(
          (_, index) =>
            theme.chartColors[index % theme.chartColors.length] + '33' // Semi-transparent
        ),
        borderColor: Object.keys(statusCounts).map(
          (_, index) => theme.chartColors[index % theme.chartColors.length]
        ),
        borderWidth: 2,
        cutout: '60%', // Donut effect
      },
    ],
  };

  // Progress and Risk charts using Chart.js
  const progressChartData = {
    labels: progressData.map((point) => point.x),
    datasets: [
      {
        label: 'Task Progress (%)',
        data: progressData.map((point) => point.y),
        backgroundColor: progressData.map(
          (_, index) =>
            theme.chartColors[index % theme.chartColors.length] + '33' // Semi-transparent
        ),
        borderColor: progressData.map(
          (_, index) => theme.chartColors[index % theme.chartColors.length]
        ),
        tension: 0.4,
        pointRadius: 4,
      },
    ],
  };

  const riskChartData = {
    labels: Object.keys(fullRiskCounts),
    datasets: [
      {
        label: 'Risk Levels',
        data: Object.values(fullRiskCounts),
        backgroundColor: theme.chartColors[0] + '33', // Semi-transparent
        borderColor: theme.chartColors[0],
        pointBackgroundColor: theme.chartColors[0],
        borderWidth: 2,
        pointBorderColor: '#FFFFFF',
      },
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: theme.palette.text.primary,
        },
      },
      tooltip: {
        backgroundColor: theme.palette.background.paper,
        bodyColor: theme.palette.text.primary,
      },
    },
    scales: chartType === 'status' ? {} : { // Remove grid only for Doughnut chart
      r: {
        angleLines: {
          color: theme.palette.divider,
        },
        grid: {
          color: theme.palette.divider,
        },
        pointLabels: {
          color: theme.palette.text.primary,
        },
        ticks: {
          display: false,
        },
      },
    },
  };  

  // Chart rendering logic
  const renderChart = () => {
    switch (chartType) {
      case 'status':
        return <Doughnut data={statusChartData} options={chartOptions} />;
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

  return (
    <div className="chart-container">
      {renderChart()}
    </div>
  );
};

export default TaskCharts;

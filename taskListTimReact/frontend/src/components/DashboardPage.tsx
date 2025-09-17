import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import './DashboardStyles.css';
import TaskCharts from './TaskCharts';
import { getTasks, Task } from '../api/taskApi';

const DashboardPage: React.FC = () => {
  const theme = useTheme();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const fetchedTasks = await getTasks();
  
      const transformedTasks = fetchedTasks.map((task) => ({
        ...task,
        riskLevel: (task as any).risk_level, 
      }));
  
      setTasks(transformedTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const dynamicStyles = {
    container: {
      backgroundColor: theme.palette.background.default,
      color: theme.palette.text.primary,
    },
    header: {
      color: theme.palette.text.primary,
    },
    subtitle: {
      color: theme.palette.text.secondary,
    },
    chartContainer: {
      backgroundColor: theme.palette.background.paper,
      border: `1px border ${theme.palette.secondary.main}`,
      boxShadow: `0 0 5px ${theme.palette.secondary.main}`,
    },
  };

  type Metrics = {
    priorityCounts: Record<string, number>;
    statusCounts: Record<string, number>;
    progressData: { x: string; y: number }[];
    riskCounts: Record<string, number>;
  };
     
  const calculateMetrics = (): Metrics => {
    const priorityCounts: Record<string, number> = { High: 0, Medium: 0, Low: 0, Urgent: 0 };
    const statusCounts: Record<string, number> = { 'To Do': 0, 'In Progress': 0, Completed: 0, 'On Hold': 0 };
    const progressData: { x: string; y: number }[] = [];
    const riskCounts: Record<string, number> = { High: 0, Medium: 0, Low: 0, Undecided: 0 };
  
    tasks.forEach((task) => {
      
      if (task.priority && priorityCounts[task.priority] !== undefined) {
        priorityCounts[task.priority]++;
      }
      
      if (task.status && statusCounts[task.status] !== undefined) {
        statusCounts[task.status]++;
      }
      
      if (task.riskLevel && riskCounts[task.riskLevel] !== undefined) {
        riskCounts[task.riskLevel]++;
      } else {
        riskCounts.Undecided++; 
      }
      
      if (task.title) {
        progressData.push({ x: task.title, y: task.progress || 0 });
      }
    });
  
    return { priorityCounts, statusCounts, progressData, riskCounts };
  };
  

  const metrics = loading ? null : calculateMetrics();
  console.log('Metrics:', metrics);
  return (
    <div style={dynamicStyles.container} className="dashboard-container">
      <div style={dynamicStyles.header} className="dashboard-header">
        <h1 className="dashboard-title">Task Tracker Dashboard</h1>
        <p style={dynamicStyles.subtitle} className="dashboard-subtitle">
          Monitor progress and stay on track.
        </p>
      </div>

      {/* Main Section */}
      <div className="dashboard-main">
        {/* Task Analytics Section */}
        {!loading && metrics ? (
          <>
            <div style={dynamicStyles.chartContainer} className="dashboard-container">
              <TaskCharts metrics={metrics} chartType="status" />
            </div>
            <div style={dynamicStyles.chartContainer} className="dashboard-container">
              <TaskCharts metrics={metrics} chartType="priority" />
            </div>
            <div style={dynamicStyles.chartContainer} className="dashboard-container">
              <TaskCharts metrics={metrics} chartType="progress" />
            </div>
            <div style={dynamicStyles.chartContainer} className="dashboard-container">
              <TaskCharts metrics={metrics} chartType="risk" />
            </div>
          </>
        ) : (
          <p>Loading charts...</p>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;

import axios from 'axios';

// Define and export the Task interface
export interface Task {
  id?: number; // 'id' is optional because it might not exist before the task is saved
  title: string;
  description: string;
  priority?: string | null;
  status?: string | null;
  assignedTo?: string | null;
  startDate?: Date | string | null;
  dueDate?: Date | string | null;
  estimatedTime?: number | null;
  timeSpent?: number | null;
  tags?: string | null;
  progress?: number | null;
  comments?: string | null;
  isRecurring?: boolean | null;
  riskLevel?: string | null;
}

// Set up Axios instance for the API
const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL || 'http://localhost:4000', // Use the backend URL from the environment variable
});

// Get all tasks
export const getTasks = async (): Promise<Task[]> => {
  const response = await api.get('/tasks');
  return response.data;
};

// Add a new task
export const addTask = async (task: Omit<Task, 'id'>): Promise<Task> => {
  const response = await api.post('/tasks', task);
  return response.data;
};

// Update an existing task
export const updateTask = async (id: number, updatedTask: Omit<Task, 'id'>): Promise<Task> => {
  const response = await api.put(`/tasks/${id}`, updatedTask);
  return response.data;
};

// Delete a task
export const deleteTask = async (id: number): Promise<void> => {
  await api.delete(`/tasks/${id}`);
};

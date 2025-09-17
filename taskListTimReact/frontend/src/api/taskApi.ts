import axios from 'axios';

export interface Task {
  id?: number; 
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


const api = axios.create({
  baseURL: 'https://task-list-backend-7sesojegqq-uc.a.run.app',
  headers: {
    'Content-Type': 'application/json',
  },
});


export const getTasks = async (): Promise<Task[]> => {
  try {
    const response = await api.get('/tasks');
    console.log('response :', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error; 
  }
};


export const addTask = async (task: Omit<Task, 'id'>): Promise<Task> => {
  try {
    console.log('Payload sent to backend:', task); 
    const response = await api.post('/tasks', task);
    return response.data;
  } catch (error) {
    console.error('Error adding task:', error);
    throw error; 
  }
};


export const updateTask = async (id: number, updatedTask: Omit<Task, 'id'>): Promise<Task> => {
  const response = await api.put(`/tasks/${id}`, updatedTask);
  return response.data;
};


export const deleteTask = async (id: number): Promise<void> => {
  await api.delete(`/tasks/${id}`);
};

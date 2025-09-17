import axios from 'axios';

const chatApi = axios.create({
  baseURL: process.env.NODE_ENV === 'production'
    ? 'https://task-list-backend-113262496707.us-central1.run.app' 
    : 'http://localhost:8081', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export const sendMessage = async (message: string): Promise<string> => {
  try {
    const response = await chatApi.post('/chat', { message });
    return response.data.response;
  } catch (error) {
    console.error('Error sending message to chat API:', error);
    throw error;
  }
};

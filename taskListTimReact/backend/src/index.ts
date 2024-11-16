import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import taskRoutes from './tasks/taskRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors()); // Enable CORS for all routes

app.use(express.json());

// Use taskRoutes for all /tasks endpoints
app.use('/tasks', taskRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get('/', (req, res) => {
    res.send('Server is up and running!');
  });
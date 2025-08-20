import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import express from 'express';
import taskRoutes from './tasks/taskRoutes';
import chatRoutes from './chat/chatRoutes';
import { pool } from './db'; // Import the pool

const app = express();
// Cloud Run provides the PORT environment variable
const PORT = process.env.PORT || 8081;

app.use(cors());
app.use(express.json());
app.use('/tasks', taskRoutes);
app.use('/chat', chatRoutes); // Use chat routes

app.get('/', (req, res) => {
  res.send('Server is up and running!');
});

const startServer = async () => {
  try {
    // Bypassing database connection test for local development.
    // The /chat endpoint does not require a database connection.
    /*
    const client = await pool.connect();
    console.log('Successfully connected to the database');
    client.release();
    */

    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to connect to the database.', error);
    process.exit(1);
  }
};

startServer();

import cors from 'cors';
import express from 'express';
import taskRoutes from './tasks/taskRoutes';
import { pool } from './db'; // Import the pool

const app = express();
// Cloud Run provides the PORT environment variable
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use('/tasks', taskRoutes);

app.get('/', (req, res) => {
  res.send('Server is up and running!');
});

const startServer = async () => {
  try {
    // Test the database connection
    const client = await pool.connect();
    console.log('Successfully connected to the database');
    client.release();

    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to connect to the database.', error);
    process.exit(1);
  }
};

startServer();

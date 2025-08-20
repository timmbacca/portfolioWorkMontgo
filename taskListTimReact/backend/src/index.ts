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

// This updated CORS configuration allows requests from both 'www.tmontgo.com' and 'tmontgo.com'
const allowedOrigins = ['https://www.tmontgo.com', 'https://tmontgo.com'];

// Configure CORS options
const corsOptions = {
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// Use the CORS middleware
app.use(cors(corsOptions));

// --- END: FINAL CORS CONFIGURATION ---

app.use(express.json());
app.use('/tasks', taskRoutes);
app.use('/chat', chatRoutes); // Use chat routes

app.get('/', (req, res) => {
  res.send('Server is up and running!');
});

const startServer = async () => {
  try {
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

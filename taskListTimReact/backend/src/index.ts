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

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like Postman or mobile apps)
    if (!origin) return callback(null, true);
    // If the origin is in our allowed list, allow it
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      // Otherwise, block it
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors({
  origin: 'https://www.tmontgo.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
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
